import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.create.dto';
import { User } from './user.entity';

@Injectable()
export class UsersFactory {
  public create(userDto: CreateUserDto): User {
    const user = new User();

    user.login = userDto.login;
    user.password = userDto.password;

    return user;
  }
}
