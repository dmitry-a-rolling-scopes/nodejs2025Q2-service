import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Track } from './track.interface';

@Injectable()
export class TracksFactory {
  public create(trackDto: Partial<Track>): Track {
    return {
      id: randomUUID(),
      name: trackDto.name,
      artistId: trackDto.artistId,
      albumId: trackDto.albumId,
      duration: trackDto.duration,
    };
  }
}
