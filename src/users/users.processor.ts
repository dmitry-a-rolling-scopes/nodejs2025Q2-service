import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersFactory } from './users.factory';
import { UUID } from '../common/uuid.type';
import { UsersProvider } from './users.provider';
import { CreateUserDto } from './user.create.dto';
import { UpdatePasswordDto } from './user.password.update.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersPasswordHasher } from './users.password.hasher';

@Injectable()
export class UsersProcessor {
  constructor(
    private readonly passwordHasher: UsersPasswordHasher,
    private readonly usersFactory: UsersFactory,
    private readonly usersProvider: UsersProvider,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersFactory.create(createUserDto);

    await this.usersRepository.save(user);

    return user;
  }

  public async update(
    id: UUID,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.usersProvider.get(id);
    const passwordValid = await user.isPasswordValid(
      updatePasswordDto.oldPassword,
    );

    if (!passwordValid) {
      throw new ForbiddenException();
    }

    user.password = updatePasswordDto.newPassword;
    user.version++;

    await this.passwordHasher.hash(user);
    await this.usersRepository.save(user);

    return user;
  }

  public async delete(id: UUID): Promise<void> {
    await this.usersProvider.get(id);

    const user = await this.usersProvider.get(id);

    await this.usersRepository.delete(user);
  }
}
