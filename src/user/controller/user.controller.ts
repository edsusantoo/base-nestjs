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
  RequestUpdateUserMainDto,
  RequestUpdateUserMongoDto,
} from '../dto/user.dto';
import { ResponseMessage } from 'src/common/decorator/response.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ResponseMessage('Created Succesfully')
  createUserMain(@Body() body: RequestCreateUserMainDto) {
    return this.userService.createUserMain(body);
  }

  @Patch()
  @ResponseMessage('Updated Successfully')
  udpateUserMain(@Body() body: RequestUpdateUserMainDto) {
    return this.userService.updateUserMain(body);
  }

  @Delete(':id')
  @ResponseMessage('Deleted Successfully')
  deleteUserMain(@Param('id', ParseIntPipe) id: number) {
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
      id: Number(id),
      username,
      email,
      telp,
    });
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
