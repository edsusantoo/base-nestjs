import { Exclude } from 'class-transformer';
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RequestRegisterDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Username min 3 character',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RequestLoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class ResponseAuthDto {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;
  auth?: {
    type: string;
    token: string;
    expiredAt: string;
  };

  constructor(partial: Partial<ResponseAuthDto>) {
    Object.assign(this, partial);
  }
}
