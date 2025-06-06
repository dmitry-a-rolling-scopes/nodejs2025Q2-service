import { Injectable } from '@nestjs/common';
import { ArtistsFactory } from './artists.factory';
import { UUID } from '../common/uuid.type';
import { ArtistsProvider } from './artists.provider';
import { Artist as ArtistInterface } from './artist.interface';
import { ArtistsRepository } from './artists.repository';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsProcessor {
  constructor(
    private readonly artistsFactory: ArtistsFactory,
    private readonly artistsProvider: ArtistsProvider,
    private readonly artistRepository: ArtistsRepository,
  ) {}

  public async create(artistDto: Partial<ArtistInterface>): Promise<Artist> {
    const artist = this.artistsFactory.create(artistDto);

    await this.artistRepository.save(artist);

    return artist;
  }

  public async update(
    id: UUID,
    artistDto: Partial<ArtistInterface>,
  ): Promise<Artist> {
    const artist = await this.artistsProvider.get(id);

    artist.name = artistDto.name;
    artist.grammy = artistDto.grammy;

    await this.artistRepository.save(artist);

    return artist;
  }

  public async delete(id: UUID): Promise<void> {
    const artist = await this.artistsProvider.get(id);

    await this.artistRepository.delete(artist);
  }
}
