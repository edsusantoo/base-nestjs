import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MainPrismaService } from 'src/database/main-prisma/main-prisma.service';
import { ResponseRoleDto } from '../dto/role.dto';

interface RoleInterface {
  id?: string;
  name: string;
}

@Injectable()
export class RoleService {
  constructor(private readonly mainService: MainPrismaService) {}

  async createRole({ name }: RoleInterface): Promise<ResponseRoleDto> {
    const role = await this.mainService.role.findFirst({
      where: {
        name,
      },
    });

    if (role) {
      throw new ConflictException();
    }

    const insert = await this.mainService.role.create({
      data: {
        name,
      },
    });

    if (!insert) {
      throw new BadRequestException();
    }

    return new ResponseRoleDto(insert);
  }

  async updateRole({ id, name }: RoleInterface): Promise<ResponseRoleDto> {
    const role = await this.mainService.role.findFirst({
      where: {
        id,
      },
    });

    if (!role) {
      throw new NotFoundException();
    }

    const update = await this.mainService.role.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    if (!update) {
      throw new BadRequestException();
    }

    return new ResponseRoleDto(update);
  }

  async deleteRole(id: string) {
    const role = await this.mainService.role.findFirst({
      where: {
        id,
      },
    });

    if (!role) {
      throw new NotFoundException();
    }

    await this.mainService.role.delete({
      where: {
        id,
      },
    });

    return {};
  }

  async getRoles(): Promise<ResponseRoleDto[]> {
    const roles = await this.mainService.role.findMany();

    return roles.map((role) => {
      return new ResponseRoleDto(role);
    });
  }

  async findRole({ id, name }: RoleInterface): Promise<ResponseRoleDto[]> {
    const roles = await this.mainService.role.findMany({
      where: {
        OR: [
          {
            id: {
              equals: id ? id : '',
            },
          },
          {
            name: {
              equals: name ? name : '',
            },
          },
        ],
      },
    });

    return roles.map((role) => {
      return new ResponseRoleDto(role);
    });
  }
}
