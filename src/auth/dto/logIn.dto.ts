//Datos que vienen del front, se usa 'class'
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'Juan Pérez' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'StrongPassword123' })
  password: string;
}
