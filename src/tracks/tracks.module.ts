import { Module } from '@nestjs/common';
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

@Module({
  controllers: [TracksController],
  exports: [TracksProvider],
  imports: [ArtistsModule, AlbumsModule, TypeOrmModule.forFeature([Track])],
  providers: [
    TracksFactory,
    TracksMapper,
    TracksProcessor,
    TracksProvider,
    TracksRepository,
  ],
})
export class TracksModule {}
