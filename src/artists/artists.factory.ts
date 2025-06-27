import { Injectable } from '@nestjs/common';
import { Artist as ArtistInterface } from './artist.interface';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsFactory {
  public create(artistDto: Partial<ArtistInterface>): Artist {
    const artist = new Artist();

    artist.name = artistDto.name;
    artist.grammy = artistDto.grammy;

    return artist;
  }
}
