import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsProvider } from './albums.provider';
import { AlbumsFactory } from './albums.factory';
import { AlbumsProcessor } from './albums.processor';
import { AlbumsRepository } from './albums.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { AlbumsMapper } from './albums.mapper';
import { ArtistsModule } from '../artists/artists.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [AlbumsController],
  exports: [AlbumsMapper, AlbumsProvider],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Album]),
  ],
  providers: [
    AlbumsFactory,
    AlbumsMapper,
    AlbumsProcessor,
    AlbumsProvider,
    AlbumsRepository,
  ],
})
export class AlbumsModule {}
