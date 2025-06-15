import { Injectable } from '@nestjs/common';
import * as os from 'node:os';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { LogsFactory } from './logs.factory';
import { Stats } from 'node:fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LogsFilesService {
  private readonly logsDirectory = path.resolve(
    path.join(__dirname, '..', '..', '..', 'logs'),
  );

  private logsFilename: string;

  private logsFilePath: string;

  private readonly logsFileSize: number;

  constructor(
    configService: ConfigService,
    private readonly logsFactory: LogsFactory,
  ) {
    this.logsFileSize = configService.getOrThrow<number>('LOG_FILE_SIZE');

    this.generateFileName();
  }

  public async write(message: any, ...optionalParams: any[]): Promise<void> {
    console.log(message, ...optionalParams);

    await this.create();
    await this.rotate();

    const log = this.logsFactory.create(message, ...optionalParams);

    await fs.appendFile(this.logsFilePath, JSON.stringify(log));
    await fs.appendFile(this.logsFilePath, os.EOL);
  }

  private async create(): Promise<void> {
    if (await this.exists()) {
      return;
    }

    await fs.writeFile(this.logsFilePath, '');
  }

  private async exists(): Promise<boolean> {
    try {
      await fs.access(this.logsFilePath, fs.constants.F_OK);

      const stats = await this.stats();

      return stats.isFile();
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }

      throw error;
    }
  }

  private async size(): Promise<number> {
    const stats = await this.stats();

    return stats.size;
  }

  private async stats(): Promise<Stats> {
    return await fs.stat(this.logsFilePath);
  }

  private async rotate(): Promise<void> {
    const size = await this.size();

    if (size < this.logsFileSize * 1024) {
      return;
    }

    this.generateFileName();
  }

  private generateFileName(): void {
    this.logsFilename = `${new Date().getTime().toString()}.log`;

    this.generateFilePath();
  }

  private generateFilePath(): void {
    this.logsFilePath = path.join(this.logsDirectory, this.logsFilename);
  }
}
