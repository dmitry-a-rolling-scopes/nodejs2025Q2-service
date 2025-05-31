import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './user.create.dto';

@Injectable()
export class UsersFactory {
  public create(userDto: CreateUserDto): User {
    return {
      id: randomUUID(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }
}
