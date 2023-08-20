import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `[REQUEST]\t${method}\t${originalUrl}\t${JSON.stringify(
          body,
        )}\t${JSON.stringify(
          query,
        )}\tFROM:\t${ip}\n${userAgent}\t[RESPONSE]\t${statusCode}\t${contentLength}`,
      );
    });

    next();
  }
}
