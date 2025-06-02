import { DataSource } from '../database/database.data-source';
import { TracksProvider } from '../tracks/tracks.provider';
import { ArtistsProvider } from '../artists/artists.provider';
import { AlbumsProvider } from '../albums/albums.provider';
import { UUID } from '../common/uuid.type';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class FavoritesProcessor {
  constructor(
    private readonly dataSource: DataSource,
    private readonly albumsProvider: AlbumsProvider,
    private readonly artistsProvider: ArtistsProvider,
    private readonly tracksProvider: TracksProvider,
  ) {}

  public async deleteAlbum(id: UUID): Promise<void> {
    const album = await this.albumsProvider.get(id);

    await this.dataSource.deleteAlbumFromFavorites(album);
  }

  public async postAlbum(id: UUID): Promise<void> {
    try {
      const album = await this.albumsProvider.get(id);

      await this.dataSource.addAlbumToFavorites(album);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Not Found');
      }

      throw error;
    }
  }

  public async deleteArtist(id: UUID): Promise<void> {
    const artist = await this.artistsProvider.get(id);

    await this.dataSource.deleteArtistFromFavorites(artist);
  }

  public async postArtist(id: UUID): Promise<void> {
    try {
      const artist = await this.artistsProvider.get(id);

      await this.dataSource.addArtistToFavorites(artist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Not Found');
      }

      throw error;
    }
  }

  public async deleteTrack(id: UUID): Promise<void> {
    const track = await this.tracksProvider.get(id);

    await this.dataSource.deleteTrackFromFavorites(track);
  }

  public async postTrack(id: UUID): Promise<void> {
    try {
      const track = await this.tracksProvider.get(id);

      await this.dataSource.addTrackToFavorites(track);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Not Found');
      }

      throw error;
    }
  }
}
