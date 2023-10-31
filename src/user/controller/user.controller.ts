import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import {
  RequestCreateUserMainDto,
  RequestCreateUserMongoDto,
  RequestAddRolesToUserDto,
  RequestUpdateUserMainDto,
  RequestUpdateUserMongoDto,
} from '../dto/user.dto';
import { ResponseMessage } from 'src/common/decorator/response.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ResponseMessageType } from 'src/common/dto/response.dto';
import { RoleGuard } from 'src/role/guard/role.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enum/role.enum';

@Controller('user')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ResponseMessage('Created Succesfully')
  @Roles(Role.Admin)
  createUserMain(@Body() body: RequestCreateUserMainDto) {
    return this.userService.createUserMain(body);
  }

  @Patch()
  @ResponseMessage('Updated Successfully')
  @Roles(Role.Admin)
  udpateUserMain(@Body() body: RequestUpdateUserMainDto) {
    return this.userService.updateUserMain(body);
  }

  @Delete(':id')
  @ResponseMessage('Deleted Successfully')
  @Roles(Role.Admin)
  deleteUserMain(@Param('id') id: string) {
    return this.userService.deleteUserMain(id);
  }

  @Get()
  @ResponseMessage('Show Datas')
  getUsersMain() {
    return this.userService.getUsersMain();
  }

  @Get('find?')
  @ResponseMessage('Find Data')
  findUser(
    @Query('id') id: string,
    @Query('username') username: string,
    @Query('email') email: string,
    @Query('telp') telp: string,
  ) {
    return this.userService.findUserMain({
      id,
      username,
      email,
      telp,
    });
  }

  @Post('roles')
  @ResponseMessage(ResponseMessageType.SuccessCreated)
  addRolesToUser(@Body() body: RequestAddRolesToUserDto) {
    return this.userService.addRolesToUser(body);
  }

  @Post('mongo')
  createUserMongo(@Body() body: RequestCreateUserMongoDto) {
    return this.userService.createUserMongo(body);
  }

  @Patch('mongo')
  updateUserMongo(@Body() body: RequestUpdateUserMongoDto) {
    return this.userService.updateUserMongo(body);
  }

  @Delete('mongo/:id')
  deleteUserMongo(@Param('id') id: string) {
    return this.userService.deleteUserMongo(id);
  }

  @Get('mongo')
  getUsersMongo() {
    return this.userService.getUsersMongo();
  }

  @Get('mongo/find?')
  findUserMongo(
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('email') email: string,
  ) {
    return this.userService.findUserMongo({
      id,
      name,
      email,
    });
  }
}
