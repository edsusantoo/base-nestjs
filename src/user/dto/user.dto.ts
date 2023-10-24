export class UserDto {
  id: string;
  username: string;
  email: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
