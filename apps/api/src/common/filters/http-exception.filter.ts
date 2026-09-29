import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.log('🔴 Исключение перехвачено фильтром:');
    console.log('URL:', request.url);
    console.log('Метод:', request.method);
    console.log('Статус:', status);
    console.log('Сообщение:', exceptionResponse);

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: typeof exceptionResponse === 'string' 
        ? exceptionResponse 
        : (exceptionResponse as any).message || exception.message,
      error: typeof exceptionResponse === 'object' 
        ? (exceptionResponse as any).error 
        : 'Error',
    };

    response.status(status).json(errorResponse);
  }
}