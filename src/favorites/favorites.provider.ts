import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { Favorites } from './favorites.entity';
import { FavoritesFactory } from './favorites.factory';

@Injectable()
export class FavoritesProvider {
  constructor(
    private readonly favoritesFactory: FavoritesFactory,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  public async getOrCreate(): Promise<Favorites> {
    let favorites = await this.favoritesRepository.findOne();

    if (!favorites) {
      favorites = this.favoritesFactory.create();

      await this.favoritesRepository.save(favorites);
    }

    return favorites;
  }
}
