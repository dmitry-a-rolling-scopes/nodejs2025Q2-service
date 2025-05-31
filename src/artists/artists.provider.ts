import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.interface';
import { DataSource } from '../database/database.data-source';

@Injectable()
export class ArtistsProvider {
  constructor(private dataSource: DataSource) {}

  public async getAll(): Promise<Artist[]> {
    return await this.dataSource.getArtists();
  }

  public async get(id: string): Promise<Artist> {
    const artist = await this.dataSource.getArtist(id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }
}
