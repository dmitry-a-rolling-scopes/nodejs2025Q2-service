import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.create.dto';
import { User } from './user.entity';
import { UsersPasswordHasher } from './users.password.hasher';

@Injectable()
export class UsersFactory {
  constructor(private readonly passwordHasher: UsersPasswordHasher) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.login = userDto.login;
    user.password = userDto.password;

    await this.passwordHasher.hash(user);

    return user;
  }
}
