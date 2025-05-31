import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesProvider } from './favorites.provider';
import { DatabaseModule } from '../database/database.module';
import { FavoritesProcessor } from './favorites.processor';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [FavoritesController],
  imports: [AlbumsModule, ArtistsModule, DatabaseModule, TracksModule],
  providers: [FavoritesProcessor, FavoritesProvider],
})
export class FavoritesModule {}
