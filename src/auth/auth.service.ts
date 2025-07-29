import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  createUser(user: CreateUserDto) {
    return this.prisma.user.create({ data: user });
  }
}
