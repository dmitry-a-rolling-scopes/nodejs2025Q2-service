import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsProvider } from './artists.provider';
import { ArtistsFactory } from './artists.factory';
import { ArtistsProcessor } from './artists.processor';
import { ArtistsRepository } from './artists.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { ArtistsMapper } from './artists.mapper';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [ArtistsController],
  exports: [ArtistsMapper, ArtistsProvider],
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Artist]),
  ],
  providers: [
    ArtistsFactory,
    ArtistsMapper,
    ArtistsProcessor,
    ArtistsProvider,
    ArtistsRepository,
  ],
})
export class ArtistsModule {}
