//Datos que vienen del front, se usa 'class'
//validaciones
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'StrongPassword123' })
  password: string;
}
