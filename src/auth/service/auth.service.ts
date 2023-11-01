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

    return new ResponseRegisterDto(register);
  }

  async login({ username, password }: LoginRequestInterface) {
    const user = await this.mainService.user.findFirst({
      where: {
        username,
      },
      include: {
        userRole: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Password not match');
    }

    //show role
    const roles: string[] = user.userRole.map((item) => item.role.name);

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: roles,
    };
    const accessToken = this.jwtService.sign(payload);

    return new ResponseLoginDto({
      ...user,
      id: user.id,
      roles: roles,
      auth: { type: 'Bearer', token: accessToken, expiredAt: '360' },
    });
  }
}
