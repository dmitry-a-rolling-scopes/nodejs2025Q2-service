import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from '../database/database.data-source';
import { UserDto } from './user.dto';
import { UUID } from '../common/uuid.type';

@Injectable()
export class UsersProvider {
  constructor(private dataSource: DataSource) {}

  public async getAll(): Promise<UserDto[]> {
    return await this.dataSource.getUsersDtos();
  }

  public async get(id: UUID): Promise<UserDto> {
    const user = await this.dataSource.getUserDto(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
