import { Module } from '@nestjs/common';
import { LogsLevelsProvider } from './logs.levels.provider';
import { LoggingService } from './logs.logging.service';
import { LogsFilesService } from './logs.files.service';
import { LogsFactory } from './logs.factory';
import { APP_FILTER } from '@nestjs/core';
import { LoggingExceptionFilter } from './logs.logging.exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: LoggingExceptionFilter,
    },
    LogsFactory,
    LogsFilesService,
    LogsLevelsProvider,
    LoggingService,
  ],
})
export class LogsModule {}
