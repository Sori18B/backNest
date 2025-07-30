import { Body, Get, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { LoginUserDto } from './dto/logIn.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: 'El correo ya está registrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error inesperado al crear el usuario',
  })
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  verifyUser(@Body() user: LoginUserDto) {
    return this.authService.verifyUser(user);
  }

  @Get('users')
  @ApiOperation({ summary: 'Obtener todos los usuarios registrados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
  })
  getUsers() {
    return this.authService.getUsers();
  }
}
