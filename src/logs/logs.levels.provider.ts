import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LOG_LEVELS } from '@nestjs/common/services/logger.service';

@Injectable()
export class LogsLevelsProvider {
  constructor(private readonly configService: ConfigService) {}

  public provide(): LogLevel[] {
    const currentLogsLevel =
      this.configService.getOrThrow<LogLevel>('LOG_LEVEL');

    const logsLevels = [];

    for (const logLevel of LOG_LEVELS) {
      logsLevels.push(logLevel);

      if (logLevel === currentLogsLevel) {
        break;
      }
    }

    return logsLevels;
  }
}
