import { Injectable } from '@nestjs/common';
import { Album } from './album.entity';
import { Album as AlbumInterface } from './album.interface';
import { ArtistsProvider } from '../artists/artists.provider';
import { UUID } from '../common/uuid.type';

@Injectable()
export class AlbumsFactory {
  constructor(private readonly artistsProvider: ArtistsProvider) {}

  public async create(albumDto: Partial<AlbumInterface>): Promise<Album> {
    const album = new Album();

    album.name = albumDto.name;
    album.year = albumDto.year;
    album.artist = albumDto.artistId
      ? await this.artistsProvider.get(albumDto.artistId as UUID)
      : null;

    return album;
  }
}
