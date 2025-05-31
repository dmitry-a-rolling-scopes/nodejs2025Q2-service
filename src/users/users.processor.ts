import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersFactory } from './users.factory';
import { DataSource } from '../database/database.data-source';
import { UUID } from '../common/uuid.type';
import { UsersProvider } from './users.provider';
import { CreateUserDto } from './user.create.dto';
import { UpdatePasswordDto } from './user.password.update.dto';
import { UserDto } from './user.dto';

@Injectable()
export class UsersProcessor {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersFactory: UsersFactory,
    private readonly usersProvider: UsersProvider,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.usersFactory.create(createUserDto);

    await this.dataSource.addUser(user);

    return this.dataSource.getUserDto(user.id);
  }

  public async update(
    id: UUID,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserDto> {
    const userDto = await this.usersProvider.get(id);
    const user = await this.dataSource.getUser(userDto.id);
    const currentPassword = user.password;
    const oldPassword = updatePasswordDto.oldPassword;
    const newPassword = updatePasswordDto.newPassword;

    if (oldPassword !== currentPassword) {
      throw new ForbiddenException();
    }

    if (oldPassword === newPassword) {
      return userDto;
    }

    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    return this.dataSource.getUserDto(user.id);
  }

  public async delete(id: UUID): Promise<void> {
    await this.usersProvider.get(id);

    const user = await this.dataSource.getUser(id);

    await this.dataSource.deleteUser(user);
  }
}
