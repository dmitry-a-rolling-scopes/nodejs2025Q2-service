import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksProvider } from './tracks.provider';
import { DatabaseModule } from '../database/database.module';
import { TracksProcessor } from './tracks.processor';
import { TracksFactory } from './tracks.factory';

@Module({
  controllers: [TracksController],
  imports: [DatabaseModule],
  providers: [TracksFactory, TracksProcessor, TracksProvider],
})
export class TracksModule {}
