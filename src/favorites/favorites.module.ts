import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesProvider } from './favorites.provider';
import { FavoritesProcessor } from './favorites.processor';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesRepository } from './favorites.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { FavoritesMapper } from './favorites.mapper';

@Module({
  controllers: [FavoritesController],
  imports: [
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    TypeOrmModule.forFeature([Favorites]),
  ],
  providers: [
    FavoritesMapper,
    FavoritesProcessor,
    FavoritesProvider,
    FavoritesRepository,
  ],
})
export class FavoritesModule {}
