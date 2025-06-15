import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './type-orm.module-options';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    AlbumsModule,
    ArtistsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FavoritesModule,
    LogsModule,
    TracksModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
