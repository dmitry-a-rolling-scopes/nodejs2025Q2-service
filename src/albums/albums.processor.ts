import { Injectable } from '@nestjs/common';
import { Album as AlbumInterface } from './album.interface';
import { AlbumsFactory } from './albums.factory';
import { AlbumsProvider } from './albums.provider';
import { UUID } from '../common/uuid.type';
import { AlbumsRepository } from './albums.repository';
import { ArtistsProvider } from '../artists/artists.provider';
import { Album } from './album.entity';
import { FavoritesProcessor } from '../favorites/favorites.processor';

@Injectable()
export class AlbumsProcessor {
  constructor(
    private readonly albumsFactory: AlbumsFactory,
    private readonly albumsProvider: AlbumsProvider,
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistProvider: ArtistsProvider,
    private readonly favoritesProcessor: FavoritesProcessor,
  ) {}

  public async create(albumDto: Partial<AlbumInterface>): Promise<Album> {
    const album = await this.albumsFactory.create(albumDto);

    await this.albumsRepository.save(album);

    return album;
  }

  public async update(
    id: UUID,
    albumDto: Partial<AlbumInterface>,
  ): Promise<Album> {
    const album = await this.albumsProvider.get(id);

    album.name = albumDto.name;
    album.year = albumDto.year;
    album.artist = albumDto.artistId
      ? await this.artistProvider.get(albumDto.artistId as UUID)
      : null;

    await this.albumsRepository.save(album);

    return album;
  }

  public async delete(id: UUID): Promise<void> {
    const album = await this.albumsProvider.get(id);

    await this.favoritesProcessor.deleteAlbum(id);
    await this.albumsRepository.delete(album);
  }
}
