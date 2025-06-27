import { Album } from './album.entity';
import { Album as AlbumInterface } from './album.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumsMapper {
  public map(album: Album): AlbumInterface {
    return {
      id: album.id,
      artistId: album.artist?.id ?? null,
      name: album.name,
      year: album.year,
    };
  }
}
