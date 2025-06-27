import { Track as TrackInterface } from './track.interface';
import { Injectable } from '@nestjs/common';
import { Track } from './track.entity';

@Injectable()
export class TracksMapper {
  public map(track: Track): TrackInterface {
    return {
      id: track.id,
      name: track.name,
      artistId: track.artist?.id ?? null,
      albumId: track.album?.id ?? null,
      duration: track.duration,
    };
  }
}
