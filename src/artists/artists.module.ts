import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsProvider } from './artists.provider';
import { ArtistsFactory } from './artists.factory';
import { ArtistsProcessor } from './artists.processor';
import { ArtistsRepository } from './artists.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { ArtistsMapper } from './artists.mapper';

@Module({
  controllers: [ArtistsController],
  exports: [ArtistsProvider],
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [
    ArtistsFactory,
    ArtistsMapper,
    ArtistsProcessor,
    ArtistsProvider,
    ArtistsRepository,
  ],
})
export class ArtistsModule {}
