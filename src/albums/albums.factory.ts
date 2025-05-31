import { Album } from './album.interface';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumsFactory {
  public create(albumDto: Partial<Album>): Album {
    return {
      id: randomUUID(),
      name: albumDto.name,
      year: albumDto.year,
      artistId: albumDto.artistId,
    };
  }
}
