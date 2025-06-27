import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from '../common/uuid.type';
import { AlbumsRepository } from './albums.repository';
import { Album } from './album.entity';

@Injectable()
export class AlbumsProvider {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

  public async getAll(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }

  public async get(id: UUID): Promise<Album> {
    const album = await this.albumsRepository.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }
}
