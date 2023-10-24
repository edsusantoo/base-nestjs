import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { MainPrismaService } from 'src/database/main-prisma/main-prisma.service';
import { MongoPrismaService } from 'src/database/mongo-prisma/mongo-prisma.service';
import { UserDto } from '../dto/user.dto';

interface UserRequestInterface {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  telp?: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly mainService: MainPrismaService,
    private readonly mongoService: MongoPrismaService,
  ) {}

  async createUserMain({
    username,
    email,
  }: UserRequestInterface): Promise<UserDto> {
    const user = await this.mainService.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new ConflictException();
    }

    const insert = await this.mainService.user.create({
      data: {
        username,
        email,
      },
    });

    if (!insert) {
      throw new NotAcceptableException();
    }

    return new UserDto({ ...insert, id: insert.id.toString() });
  }

  async updateUserMain({
    id,
    username,
    email,
  }: UserRequestInterface): Promise<UserDto> {
    const user = await this.mainService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const update = await this.mainService.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
      },
    });

    return new UserDto({ ...update, id: update.id.toString() });
  }

  async deleteUserMain(id: number) {
    const user = await this.mainService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    await this.mainService.user.delete({
      where: {
        id,
      },
    });
  }

  async getUsersMain(): Promise<UserDto[]> {
    const users = await this.mainService.user.findMany();

    return users.map((user) => {
      return new UserDto({ ...user, id: user.id.toString() });
    });
  }

  async findUserMain({
    id,
    username,
    email,
  }: UserRequestInterface): Promise<UserDto[]> {
    const users = await this.mainService.user.findMany({
      where: {
        OR: [
          {
            id: {
              equals: id,
            },
          },
          {
            username: {
              equals: username,
            },
          },
          {
            email: {
              equals: email,
            },
          },
        ],
      },
    });

    return users.map((user) => {
      return new UserDto({ ...user, id: user.id.toString() });
    });
  }

  async createUserMongo({
    name,
    email,
  }: UserRequestInterface): Promise<UserDto> {
    const user = await this.mongoService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ConflictException();
    }

    const insert = await this.mongoService.user.create({
      data: {
        name,
        email,
      },
    });

    if (!insert) {
      throw new NotAcceptableException();
    }

    return new UserDto({ ...insert, id: insert.id });
  }

  async updateUserMongo({
    id,
    name,
    email,
  }: UserRequestInterface): Promise<UserDto> {
    const user = await this.mongoService.user.findFirst({
      where: {
        id: id.toString(),
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const update = await this.mongoService.user.update({
      where: {
        id: id.toString(),
      },
      data: {
        name,
        email,
      },
    });

    if (!update) {
      throw new NotAcceptableException();
    }

    return new UserDto({ ...update, id: update.id.toString() });
  }

  async deleteUserMongo(id: string) {
    const user = await this.mongoService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    await this.mongoService.user.delete({
      where: {
        id,
      },
    });
  }

  async getUsersMongo(): Promise<UserDto[]> {
    const users = await this.mongoService.user.findMany();

    return users.map((user) => {
      return new UserDto({ ...user, id: user.id.toString() });
    });
  }

  async findUserMongo({
    id,
    name,
    email,
  }: UserRequestInterface): Promise<UserDto[]> {
    const users = await this.mongoService.user.findMany({
      where: {
        OR: [
          {
            id: {
              equals: id.toString(),
            },
          },
          {
            name: {
              equals: name,
            },
          },
          {
            email: {
              equals: email,
            },
          },
        ],
      },
    });

    return users.map((user) => {
      return new UserDto({ ...user, id: user.id.toString() });
    });
  }
}
