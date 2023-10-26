import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { MainPrismaService } from 'src/database/main-prisma/main-prisma.service';

import * as bcrypt from 'bcrypt';
import { ResponseAuthDto } from '../dto/auth.dto';

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
  constructor(private readonly mainService: MainPrismaService) {}

  async register({
    username,
    email,
    password,
  }: RegisterRequestInterface): Promise<ResponseAuthDto> {
    const user = await this.mainService.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      throw new ConflictException();
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

    return new ResponseAuthDto({ ...register, id: Number(register.id) });
  }

  async login({ username, password }: LoginRequestInterface) {
    const user = await this.mainService.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Password not match');
    }

    return new ResponseAuthDto({ ...user, id: Number(user.id) });
  }
}
