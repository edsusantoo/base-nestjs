import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Get,
  Query,
} from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { RequestCreateRoleDto, RequestUpdateRoleDto } from '../dto/role.dto';
import { ResponseMessage } from 'src/common/decorator/response.decorator';
import { ResponseMessageType } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ResponseMessage(ResponseMessageType.SuccessCreated)
  createRole(@Body() body: RequestCreateRoleDto) {
    return this.roleService.createRole(body);
  }

  @Patch()
  @ResponseMessage(ResponseMessageType.SuccessUpdate)
  updateRole(@Body() body: RequestUpdateRoleDto) {
    return this.roleService.updateRole(body);
  }

  @Delete(':id')
  @ResponseMessage(ResponseMessageType.SuccessDelete)
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteRole(id);
  }

  @Get()
  @ResponseMessage(ResponseMessageType.SuccessShowData)
  getRoles() {
    return this.roleService.getRoles();
  }

  @Get('find?')
  @ResponseMessage(ResponseMessageType.SuccessFindData)
  findRole(@Query('id') id: string, @Query('name') name: string) {
    return this.roleService.findRole({
      id: Number(id),
      name,
    });
  }
}
