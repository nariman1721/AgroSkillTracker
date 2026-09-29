import { HttpException, HttpStatus } from '@nestjs/common';

export class NarimanException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: message || 'NarimanException',
        timestamp: new Date().toISOString(),
        type: 'NarimanCustomError',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}