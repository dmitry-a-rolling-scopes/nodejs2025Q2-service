import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from '../common/uuid.type';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersProvider {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async get(id: UUID): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async getByLogin(login: string): Promise<User> {
    const user = await this.usersRepository.findOneByLogin(login);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
