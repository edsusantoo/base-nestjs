import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ResponseMessage } from 'src/common/decorator/response.decorator';
import { RequestLoginDto, RequestRegisterDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage('Register Successfully')
  register(@Body() body: RequestRegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(200)
  @ResponseMessage('Login Successfully')
  login(@Body() body: RequestLoginDto) {
    return this.authService.login(body);
  }
}
