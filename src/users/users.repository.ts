import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from '../common/uuid.type';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async delete(user: User): Promise<DeleteResult> {
    return await this.usersRepository.delete(user);
  }

  public async find(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async findOne(id: UUID): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  public async save(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }
}
