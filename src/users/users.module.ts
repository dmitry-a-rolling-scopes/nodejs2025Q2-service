import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.provider';
import { UsersProcessor } from './users.processor';
import { UsersFactory } from './users.factory';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersMapper } from './users.mapper';
import { UsersPasswordHasher } from './users.password.hasher';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersFactory,
    UsersMapper,
    UsersPasswordHasher,
    UsersProcessor,
    UsersProvider,
    UsersRepository,
  ],
  exports: [UsersMapper, UsersProcessor, UsersProvider],
})
export class UsersModule {}
