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
    const { method, url } = request;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: string | object = {
      message: getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR),
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      body = exception.getResponse();
    }

    body = typeof body === 'string' ? { message: body } : body;

    await this.loggingService.log(method, url, status, body);

    response.status(status).json(body);
  }
}
