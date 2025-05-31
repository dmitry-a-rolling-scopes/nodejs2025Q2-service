import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.interface';
import { DataSource } from '../database/database.data-source';
import { UUID } from '../common/uuid.type';

@Injectable()
export class ArtistsProvider {
  constructor(private dataSource: DataSource) {}

  public async getAll(): Promise<Artist[]> {
    return await this.dataSource.getArtists();
  }

  public async get(id: UUID): Promise<Artist> {
    const artist = await this.dataSource.getArtist(id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }
}
