import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as ExceptionFilterInterface,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from './logs.logging.service';
import { getReasonPhrase } from 'http-status-codes';
import { Request, Response } from 'express';

@Catch(Error)
export class LoggingExceptionFilter implements ExceptionFilterInterface {
  constructor(private readonly loggingService: LoggingService) {}

  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const { method, url, query, body } = request;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = {
      message: getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR),
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    message = typeof message === 'string' ? { message } : message;

    await this.loggingService.error(method, url, query, body, status);

    response.status(status).json(message);
  }
}
