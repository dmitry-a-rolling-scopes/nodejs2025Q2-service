import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from '../common/uuid.type';
import { Track } from './track.entity';

@Injectable()
export class TracksRepository {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  public async delete(track: Track): Promise<DeleteResult> {
    return await this.tracksRepository.delete(track);
  }

  public async find(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  public async findOne(id: UUID): Promise<Track | null> {
    return await this.tracksRepository.findOne({ where: { id: id } });
  }

  public async save(track: Track): Promise<Track> {
    return await this.tracksRepository.save(track);
  }
}
