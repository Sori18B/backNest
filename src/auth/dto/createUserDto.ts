//Datos que vienen del front, se usa 'class'
//validaciones
import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  age: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
