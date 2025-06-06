import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Album } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from '../common/uuid.type';

@Injectable()
export class AlbumsRepository {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  public async delete(album: Album): Promise<DeleteResult> {
    return await this.albumsRepository.delete(album);
  }

  public async find(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }

  public async findOne(id: UUID): Promise<Album | null> {
    return await this.albumsRepository.findOne({ where: { id: id } });
  }

  public async save(album: Album): Promise<Album> {
    return await this.albumsRepository.save(album);
  }
}
