import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class AuthService {
  private usersArray: CreateUserDto[] = [
    {
      id: 1,
      name: 'Eduardo',
      age: 20,
      email: 'ssjeduardo49@gmail.com',
      password: 'Nagato2001',
    },
  ];

  createUser(user: CreateUserDto) {
    this.usersArray.push(user);
    return 'Usuario añadido';
  }

  getUsers() {
    return this.usersArray;
  }
}
