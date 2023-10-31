import { IsNotEmpty, MinLength } from 'class-validator';

export class RequestCreateRoleDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Role min 3 character',
  })
  name: string;
}

export class RequestUpdateRoleDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}

export class ResponseRoleDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ResponseRoleDto>) {
    Object.assign(this, partial);
  }
}
