import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.provider';
import { DatabaseModule } from '../database/database.module';
import { UsersProcessor } from './users.processor';
import { UsersFactory } from './users.factory';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UsersFactory, UsersProcessor, UsersProvider],
})
export class UsersModule {}
