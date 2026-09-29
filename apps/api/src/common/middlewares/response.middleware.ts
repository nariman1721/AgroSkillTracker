import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ResponseLoggedMiddleware implements NestMiddleware {

  use(req: any, res: any, next: () => void) {

    const start = Date.now();

    res.on('finish', () => {

      const time = Date.now() - start;

      console.log("URL:", req.baseUrl);
      console.log("Status:", res.statusCode);
      console.log("Response time:", time, "ms");

    });

    next();

  }

}