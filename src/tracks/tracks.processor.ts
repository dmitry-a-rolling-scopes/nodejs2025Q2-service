import { Injectable } from '@nestjs/common';
import { TracksFactory } from './tracks.factory';
import { DataSource } from '../database/database.data-source';
import { UUID } from '../common/uuid.type';
import { TracksProvider } from './tracks.provider';
import { Track } from './track.interface';

@Injectable()
export class TracksProcessor {
  constructor(
    private readonly dataSource: DataSource,
    private readonly tracksFactory: TracksFactory,
    private readonly tracksProvider: TracksProvider,
  ) {}

  public async create(trackDto: Partial<Track>): Promise<Track> {
    const track = this.tracksFactory.create(trackDto);

    await this.dataSource.addTrack(track);

    return track;
  }

  public async update(id: UUID, trackDto: Partial<Track>): Promise<Track> {
    const track = await this.tracksProvider.get(id);

    track.name = trackDto.name;
    track.artistId = trackDto.artistId;
    track.albumId = trackDto.albumId;
    track.duration = trackDto.duration;

    return track;
  }

  public async delete(id: UUID): Promise<void> {
    const track = await this.tracksProvider.get(id);

    await this.dataSource.deleteTrack(track);
  }
}
