import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { Favorites } from './favorites.entity';

@Injectable()
export class FavoritesProvider {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  public async getAll(): Promise<Favorites> {
    return await this.favoritesRepository.findOne();
  }
}
