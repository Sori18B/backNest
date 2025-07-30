import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDto } from './dto/logIn.dto';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword;
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(user: CreateUserDto) {
    try {
      const newData = { ...user };
      newData.password = await this.hashPassword(user.password);

      return await this.prisma.user.create({
        data: newData,
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('El correo ya está registrado');
      }

      // Otros errores de Prisma u errores inesperados
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async verifyUser(user: LoginUserDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const isPasswordValid = await compare(user.password, foundUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    return foundUser;
  }
}
