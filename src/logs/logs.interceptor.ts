import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from './logs.logging.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, query, body } = request;
    const status = response.statusCode;

    return next.handle().pipe(
      tap(async (response): Promise<void> => {
        await this.loggingService.log(
          method,
          url,
          query,
          body,
          status,
          response,
        );
      }),
    );
  }
}
