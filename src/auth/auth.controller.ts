import { Body, Get, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }
}
