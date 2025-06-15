import { Injectable, LogLevel } from '@nestjs/common';
import { LogsLevelsProvider } from './logs.levels.provider';
import { LoggerService } from '@nestjs/common/services/logger.service';
import { LogsFilesService } from './logs.files.service';

@Injectable()
export class LoggingService implements LoggerService {
  private logLevels: LogLevel[];

  constructor(
    private readonly logsFilesService: LogsFilesService,
    logsLevelProvider: LogsLevelsProvider,
  ) {
    this.setLogLevels(logsLevelProvider.provide());
  }

  public async log(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.hasLogLevel('log')) {
      return;
    }

    await this.logsFilesService.write(message, ...optionalParams);
  }

  public async error(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.hasLogLevel('error')) {
      return;
    }

    await this.logsFilesService.write(message, ...optionalParams);
  }

  public async warn(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.hasLogLevel('warn')) {
      return;
    }

    await this.logsFilesService.write(message, ...optionalParams);
  }

  public async debug?(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.hasLogLevel('debug')) {
      return;
    }

    await this.logsFilesService.write(message, ...optionalParams);
  }

  public async verbose?(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.hasLogLevel('verbose')) {
      return;
    }

    await this.logsFilesService.write(message, ...optionalParams);
  }

  public async fatal?(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.hasLogLevel('fatal')) {
      return;
    }

    await this.logsFilesService.write(message, ...optionalParams);
  }

  public setLogLevels?(levels: LogLevel[]): any {
    this.logLevels = levels;
  }

  private hasLogLevel(logLevel: LogLevel): boolean {
    return this.logLevels.includes(logLevel);
  }
}
