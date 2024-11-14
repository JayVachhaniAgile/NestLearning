import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authPayloadDTO } from './dto/auth.dto';

@Controller('basic-auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() payload: authPayloadDTO) {
    const user = this.authService.validateUser(payload);
    if (!user) throw new HttpException('Invalid Credentials', 404);
    return user;
  }
}
