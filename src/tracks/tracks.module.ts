import { forwardRef, Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksProvider } from './tracks.provider';
import { TracksProcessor } from './tracks.processor';
import { TracksFactory } from './tracks.factory';
import { TracksRepository } from './tracks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { TracksMapper } from './tracks.mapper';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [TracksController],
  exports: [TracksMapper, TracksProvider],
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Track]),
  ],
  providers: [
    TracksFactory,
    TracksMapper,
    TracksProcessor,
    TracksProvider,
    TracksRepository,
  ],
})
export class TracksModule {}
