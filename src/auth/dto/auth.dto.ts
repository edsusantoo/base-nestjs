import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ResponseRoleDto } from 'src/role/dto/role.dto';

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

export class ResponseLoginDto {
  id: string;
  username: string;
  email: string;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  @Exclude()
  userRole: any[];

  roles: string[];

  @Exclude()
  password: string;
  auth?: {
    type: string;
    token: string;
    expiredAt: string;
  };

  constructor(partial: Partial<ResponseLoginDto>) {
    Object.assign(this, partial);
  }
}

export class ResponseRegisterDto {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<ResponseRegisterDto>) {
    Object.assign(this, partial);
  }
}
