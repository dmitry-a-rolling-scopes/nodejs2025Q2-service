import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersFactory } from './users.factory';
import { UUID } from '../common/uuid.type';
import { UsersProvider } from './users.provider';
import { CreateUserDto } from './user.create.dto';
import { UpdatePasswordDto } from './user.password.update.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersProcessor {
  constructor(
    private readonly usersFactory: UsersFactory,
    private readonly usersProvider: UsersProvider,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersFactory.create(createUserDto);

    await this.usersRepository.save(user);

    return user;
  }

  public async update(
    id: UUID,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.usersProvider.get(id);

    const currentPassword = user.password;
    const oldPassword = updatePasswordDto.oldPassword;
    const newPassword = updatePasswordDto.newPassword;

    if (oldPassword !== currentPassword) {
      throw new ForbiddenException();
    }

    if (oldPassword === newPassword) {
      return user;
    }

    user.password = updatePasswordDto.newPassword;
    user.version++;

    await this.usersRepository.save(user);

    return user;
  }

  public async delete(id: UUID): Promise<void> {
    await this.usersProvider.get(id);

    const user = await this.usersProvider.get(id);

    await this.usersRepository.delete(user);
  }
}
