import { Module } from '@nestjs/common';
import { DataSource } from './database.data-source';

@Module({
  exports: [DataSource],
  providers: [DataSource],
})
export class DatabaseModule {}
