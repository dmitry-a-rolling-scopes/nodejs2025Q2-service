import { Injectable } from '@nestjs/common';
import { Album } from './album.interface';
import { AlbumsFactory } from './albums.factory';
import { AlbumsProvider } from './albums.provider';
import { DataSource } from '../database/database.data-source';
import { UUID } from '../common/uuid.type';

@Injectable()
export class AlbumsProcessor {
  constructor(
    private readonly albumsFactory: AlbumsFactory,
    private readonly albumsProvider: AlbumsProvider,
    private readonly dataSource: DataSource,
  ) {}

  public async create(albumDto: Partial<Album>): Promise<Album> {
    const album = this.albumsFactory.create(albumDto);

    await this.dataSource.addAlbum(album);

    return album;
  }

  public async update(id: UUID, albumDto: Partial<Album>): Promise<Album> {
    const album = await this.albumsProvider.get(id);

    album.name = albumDto.name;
    album.year = albumDto.year;
    album.artistId = albumDto.artistId;

    return album;
  }

  public async delete(id: UUID): Promise<void> {
    const album = await this.albumsProvider.get(id);

    await this.dataSource.deleteAlbum(album);
  }
}
