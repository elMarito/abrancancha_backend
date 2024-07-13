import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  // Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // constructor(private logger:Logger){}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const details = exception.getResponse();
    // this.logger.error(`${request.method} ${request.originalUrl} ${status} error: ${exception.message}`)

    // let message = exception.message || 'Ha ocurrido un error inesperado';
    let message = details['message'];
    if (Array.isArray(message) && message.length > 0)
      message = message.join('. ') + '.';
    response.status(status).json({
      statusCode: status,
      message: message || exception.message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
    // response.status(status).json({
    //   path: request.url,
    //   timestamp: new Date().toISOString(),
    //   // statusCode: status,
    //   // message: exception.message,
    //   details,
    // });
  }
}
