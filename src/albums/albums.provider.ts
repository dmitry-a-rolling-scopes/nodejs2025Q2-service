import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './album.interface';
import { DataSource } from '../database/database.data-source';
import { UUID } from '../common/uuid.type';

@Injectable()
export class AlbumsProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async getAll(): Promise<Album[]> {
    return this.dataSource.getAlbums();
  }

  public async get(id: UUID): Promise<Album> {
    const album = await this.dataSource.getAlbum(id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }
}
