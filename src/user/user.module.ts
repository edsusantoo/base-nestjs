import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/common/interceptor/response.interceptor';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
