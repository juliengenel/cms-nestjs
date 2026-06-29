import { Body, Controller, Post } from '@nestjs/common';
import { UserDocument } from 'src/models/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    body: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ): Promise<{ accessToken: string; user: UserDocument }> {
    return this.authService.register(body);
  }

  @Post('login')
  login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ): Promise<{ accessToken: string; user: UserDocument }> {
    return this.authService.login(body);
  }
}
