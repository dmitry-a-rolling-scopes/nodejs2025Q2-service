import { Artist as ArtistInterface } from './artist.interface';
import { Injectable } from '@nestjs/common';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsMapper {
  public map(artist: Artist): ArtistInterface {
    return {
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    };
  }
}
