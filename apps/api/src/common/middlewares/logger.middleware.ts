import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: any, res: any, next: () => void) {

    console.log("Request Method:", req.method);
    console.log("Request Body:", req.body);

    next();

  }

}