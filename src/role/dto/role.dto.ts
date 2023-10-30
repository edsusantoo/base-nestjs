import { IsNotEmpty, MinLength } from 'class-validator';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export class RequestCreateRoleDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Role min 3 character',
  })
  name: string;
}

export class RequestUpdateRoleDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}

export class ResponseRoleDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ResponseRoleDto>) {
    Object.assign(this, partial);
  }
}
