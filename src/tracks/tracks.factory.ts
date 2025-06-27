import { Injectable } from '@nestjs/common';
import { Track as TrackInterface } from './track.interface';
import { ArtistsProvider } from '../artists/artists.provider';
import { AlbumsProvider } from '../albums/albums.provider';
import { Track } from './track.entity';
import { UUID } from '../common/uuid.type';

@Injectable()
export class TracksFactory {
  constructor(
    private readonly albumsProvider: AlbumsProvider,
    private readonly artistsProvider: ArtistsProvider,
  ) {}

  public async create(trackDto: Partial<TrackInterface>): Promise<Track> {
    const track = new Track();

    track.name = trackDto.name;
    track.album = trackDto.albumId
      ? await this.albumsProvider.get(trackDto.albumId as UUID)
      : null;
    track.artist = trackDto.artistId
      ? await this.artistsProvider.get(trackDto.artistId as UUID)
      : null;
    track.duration = trackDto.duration;

    return track;
  }
}
