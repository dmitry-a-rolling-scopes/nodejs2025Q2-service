import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from '../common/uuid.type';
import { TracksRepository } from './tracks.repository';
import { Track } from './track.entity';

@Injectable()
export class TracksProvider {
  constructor(private readonly tracksRepository: TracksRepository) {}

  public async getAll(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  public async get(id: UUID): Promise<Track> {
    const track = await this.tracksRepository.findOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }
}
