import { Injectable } from '@nestjs/common';

@Injectable()
export class LogsFactory {
  public create(message: any, ...optionalParams: any[]): any[] {
    return [new Date().toISOString(), message, ...optionalParams];
  }
}
