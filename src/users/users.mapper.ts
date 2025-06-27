import { User as UserInterface } from './user.interface';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersMapper {
  public map(user: User): Partial<UserInterface> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }
}
