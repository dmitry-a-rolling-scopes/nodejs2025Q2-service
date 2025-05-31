import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsProvider } from './artists.provider';
import { DatabaseModule } from '../database/database.module';
import { ArtistsFactory } from './artists.factory';
import { ArtistsProcessor } from './artists.processor';

@Module({
  controllers: [ArtistsController],
  imports: [DatabaseModule],
  providers: [ArtistsFactory, ArtistsProcessor, ArtistsProvider],
})
export class ArtistsModule {}
