import { Injectable } from '@nestjs/common';
import { ArtistsFactory } from './artists.factory';
import { DataSource } from '../database/database.data-source';
import { UUID } from '../common/uuid.type';
import { ArtistsProvider } from './artists.provider';
import { Artist } from './artist.interface';

@Injectable()
export class ArtistsProcessor {
  constructor(
    private readonly artistsFactory: ArtistsFactory,
    private readonly artistsProvider: ArtistsProvider,
    private readonly dataSource: DataSource,
  ) {}

  public async create(artistDto: Partial<Artist>): Promise<Artist> {
    const artist = this.artistsFactory.create(artistDto);

    await this.dataSource.addArtist(artist);

    return artist;
  }

  public async update(id: UUID, artistDto: Partial<Artist>): Promise<Artist> {
    const artist = await this.artistsProvider.get(id);

    artist.name = artistDto.name;
    artist.grammy = artistDto.grammy;

    return artist;
  }

  public async delete(id: UUID): Promise<void> {
    const artist = await this.artistsProvider.get(id);

    await this.dataSource.deleteArtist(artist);
  }
}
