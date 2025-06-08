import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from '../common/uuid.type';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  public async delete(artist: Artist): Promise<DeleteResult> {
    return await this.artistsRepository.delete(artist.id);
  }

  public async find(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  public async findOne(id: UUID): Promise<Artist | null> {
    return await this.artistsRepository.findOne({ where: { id: id } });
  }

  public async save(artist: Artist): Promise<Artist> {
    return await this.artistsRepository.save(artist);
  }
}
