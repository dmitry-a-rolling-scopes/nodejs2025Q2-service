import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsProvider } from './albums.provider';
import { DatabaseModule } from '../database/database.module';
import { AlbumsFactory } from './albums.factory';
import { AlbumsProcessor } from './albums.processor';

@Module({
  controllers: [AlbumsController],
  imports: [DatabaseModule],
  providers: [AlbumsFactory, AlbumsProcessor, AlbumsProvider],
})
export class AlbumsModule {}
