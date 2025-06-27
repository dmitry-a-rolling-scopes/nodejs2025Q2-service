import { Album } from './albums/album.entity';
import { Artist } from './artists/artist.entity';
import { Favorites } from './favorites/favorites.entity';
import { Track } from './tracks/track.entity';
import { User } from './users/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as path from 'node:path';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Album, Artist, Favorites, Track, User],
  synchronize: false,
  migrations: [path.join('dist', 'migrations', '*.js')],
  migrationsRun: false,
};
