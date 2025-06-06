import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';

@Injectable()
export class FavoritesRepository {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
  ) {}

  public async findOne(): Promise<Favorites | null> {
    return await this.favoritesRepository.findOne({});
  }

  public async save(favorites: Favorites): Promise<Favorites> {
    return await this.favoritesRepository.save(favorites);
  }
}
