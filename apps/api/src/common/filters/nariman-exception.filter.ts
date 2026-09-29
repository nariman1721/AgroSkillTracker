import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { NarimanException } from '../exception/nariman.exception';

@Catch(NarimanException)
export class NarimanExceptionFilter implements ExceptionFilter {
  catch(exception: NarimanException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    console.log('🎯 NarimanException перехвачена специальным фильтром!');

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      handledBy: 'NarimanExceptionFilter',
    });
  }
}