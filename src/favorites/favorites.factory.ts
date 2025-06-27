import { Favorites } from './favorites.entity';

export class FavoritesFactory {
  public create(): Favorites {
    return new Favorites();
  }
}
