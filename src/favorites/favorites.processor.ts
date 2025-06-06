import { TracksProvider } from '../tracks/tracks.provider';
import { ArtistsProvider } from '../artists/artists.provider';
import { AlbumsProvider } from '../albums/albums.provider';
import { UUID } from '../common/uuid.type';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesProvider } from './favorites.provider';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesProcessor {
  constructor(
    private readonly albumsProvider: AlbumsProvider,
    private readonly artistsProvider: ArtistsProvider,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksProvider: TracksProvider,
  ) {}

  public async deleteAlbum(id: UUID): Promise<void> {
    const album = await this.albumsProvider.get(id);
    const favorites = await this.favoritesProvider.getAll();

    favorites.deleteAlbum(album);

    await this.favoritesRepository.save(favorites);
  }

  public async postAlbum(id: UUID): Promise<void> {
    try {
      const album = await this.albumsProvider.get(id);
      const favorites = await this.favoritesProvider.getAll();

      favorites.addAlbum(album);

      await this.favoritesRepository.save(favorites);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Not Found');
      }

      throw error;
    }
  }

  public async deleteArtist(id: UUID): Promise<void> {
    const artist = await this.artistsProvider.get(id);
    const favorites = await this.favoritesProvider.getAll();

    favorites.deleteArtist(artist);

    await this.favoritesRepository.save(favorites);
  }

  public async postArtist(id: UUID): Promise<void> {
    try {
      const artist = await this.artistsProvider.get(id);
      const favorites = await this.favoritesProvider.getAll();

      favorites.addArtist(artist);

      await this.favoritesRepository.save(favorites);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Not Found');
      }

      throw error;
    }
  }

  public async deleteTrack(id: UUID): Promise<void> {
    const track = await this.tracksProvider.get(id);
    const favorites = await this.favoritesProvider.getAll();

    favorites.deleteTrack(track);

    await this.favoritesRepository.save(favorites);
  }

  public async postTrack(id: UUID): Promise<void> {
    try {
      const track = await this.tracksProvider.get(id);
      const favorites = await this.favoritesProvider.getAll();

      favorites.addTrack(track);

      await this.favoritesRepository.save(favorites);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Not Found');
      }

      throw error;
    }
  }
}
