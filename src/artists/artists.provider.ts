import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from '../common/uuid.type';
import { ArtistsRepository } from './artists.repository';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsProvider {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  public async getAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  public async get(id: UUID): Promise<Artist> {
    const artist = await this.artistsRepository.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }
}
