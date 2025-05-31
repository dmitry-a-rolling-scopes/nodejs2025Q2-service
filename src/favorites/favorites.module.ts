import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesProvider } from './favorites.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [FavoritesController],
  imports: [DatabaseModule],
  providers: [FavoritesProvider],
})
export class FavoritesModule {}
