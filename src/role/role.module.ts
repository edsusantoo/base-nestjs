import { Module } from '@nestjs/common';
import { RoleService } from './service/role.service';
import { DatabaseModule } from 'src/database/database.module';
import { RoleController } from './controller/role.controller';

@Module({
  imports: [DatabaseModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
