import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { MainPrismaService } from 'src/database/main-prisma/main-prisma.service';

import * as bcrypt from 'bcrypt';
import { ResponseLoginDto, ResponseRegisterDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseRoleDto } from 'src/role/dto/role.dto';

interface RegisterRequestInterface {
  username: string;
  email: string;
  password: string;
}

interface LoginRequestInterface {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly mainService: MainPrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    username,
    email,
    password,
  }: RegisterRequestInterface): Promise<ResponseRegisterDto> {
    const user = await this.mainService.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      throw new ConflictException('User is already register');
    }

    const saltOrRounds = 15;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const register = await this.mainService.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    if (!register) {
      throw new NotAcceptableException();
    }

    return new ResponseRegisterDto({ ...register, id: Number(register.id) });
  }

  async login({
    username,
    password,
  }: LoginRequestInterface): Promise<ResponseLoginDto> {
    const user = await this.mainService.user.findFirst({
      where: {
        username,
      },
      include: {
        userRole: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Password not match');
    }

    const payload = {
      id: Number(user.id),
      username: user.username,
      email: user.email,
      roles: user.userRole,
    };
    const accessToken = this.jwtService.sign(payload);

    return new ResponseLoginDto({
      ...user,
      id: Number(user.id),
      roles: user.userRole.map(
        (item) => new ResponseRoleDto({ ...item, id: Number(item.id) }),
      ),
      auth: { type: 'Bearer', token: accessToken, expiredAt: '360' },
    });
  }
}
