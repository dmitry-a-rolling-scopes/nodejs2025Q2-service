import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './track.interface';
import { DataSource } from '../database/database.data-source';
import { UUID } from '../common/uuid.type';

@Injectable()
export class TracksProvider {
  constructor(private dataSource: DataSource) {}

  public async getAll(): Promise<Track[]> {
    return await this.dataSource.getTracks();
  }

  public async get(id: UUID): Promise<Track> {
    const track = await this.dataSource.getTrack(id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }
}
