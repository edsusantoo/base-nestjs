import { Exclude } from 'class-transformer';
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RequestCreateUserMainDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Username min 3 character',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  telp: string;
}

export class RequestUpdateUserMainDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'Username min 3 character',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  telp: string;
}

export class ResponseUserMainDto {
  id: string;
  username: string;
  email: string;
  telp: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<ResponseUserMainDto>) {
    Object.assign(this, partial);
  }
}

export class RequestCreateUserMongoDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name min 3 character',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class RequestUpdateUserMongoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name min 3 character',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResponseUserMongoDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ResponseUserMongoDto>) {
    Object.assign(this, partial);
  }
}
