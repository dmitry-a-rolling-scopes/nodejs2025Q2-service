import { Injectable } from '@nestjs/common';
import { TracksFactory } from './tracks.factory';
import { UUID } from '../common/uuid.type';
import { TracksProvider } from './tracks.provider';
import { Track as TrackInterface } from './track.interface';
import { Track } from './track.entity';
import { TracksRepository } from './tracks.repository';
import { AlbumsProvider } from '../albums/albums.provider';
import { ArtistsProvider } from '../artists/artists.provider';
import { FavoritesProcessor } from '../favorites/favorites.processor';

@Injectable()
export class TracksProcessor {
  constructor(
    private readonly albumsProvider: AlbumsProvider,
    private readonly artistsProvider: ArtistsProvider,
    private readonly favoritesProcessor: FavoritesProcessor,
    private readonly tracksFactory: TracksFactory,
    private readonly tracksProvider: TracksProvider,
    private readonly tracksRepository: TracksRepository,
  ) {}

  public async create(trackDto: Partial<TrackInterface>): Promise<Track> {
    const track = await this.tracksFactory.create(trackDto);

    await this.tracksRepository.save(track);

    return track;
  }

  public async update(
    id: UUID,
    trackDto: Partial<TrackInterface>,
  ): Promise<Track> {
    const track = await this.tracksProvider.get(id);

    track.name = trackDto.name;
    track.artist = trackDto.artistId
      ? await this.artistsProvider.get(trackDto.artistId as UUID)
      : null;
    track.album = trackDto.albumId
      ? await this.albumsProvider.get(trackDto.albumId as UUID)
      : null;
    track.duration = trackDto.duration;

    await this.tracksRepository.save(track);

    return track;
  }

  public async delete(id: UUID): Promise<void> {
    const track = await this.tracksProvider.get(id);

    await this.favoritesProcessor.deleteTrack(id);
    await this.tracksRepository.delete(track);
  }
}
