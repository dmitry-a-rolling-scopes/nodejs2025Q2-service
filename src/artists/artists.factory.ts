import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Artist } from './artist.interface';

@Injectable()
export class ArtistsFactory {
  public create(artistDto: Partial<Artist>): Artist {
    return {
      id: randomUUID(),
      name: artistDto.name,
      grammy: artistDto.grammy,
    };
  }
}
