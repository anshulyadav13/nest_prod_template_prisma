import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LOG_EXCLUDE_KEYS } from '../constants/app.constants';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private incomingRequestLogger;
  private outGoingResponseLogger;
  constructor() {
    this.incomingRequestLogger = new Logger('⬇️  Request');
    this.outGoingResponseLogger = new Logger('⬆️  Response');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const { method, url, body, query } = request;
    let reqBody = { ...body };
    LOG_EXCLUDE_KEYS.forEach(key => {
      delete reqBody[key];
    });

    const incomingLogDetails = {
      method,
      url,
      query: Object.keys(query).length ? query : undefined,
      body: Object.keys(reqBody).length ? reqBody : undefined,
    };

    this.incomingRequestLogger.log(`${JSON.stringify(incomingLogDetails)}`);

    return next.handle().pipe(
      tap((data) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const outgoingLogDetails = {
          method,
          url,
          statusCode: response.statusCode,
          responseTime: `${responseTime}ms`,
          responseData: JSON.stringify(data),
        };

        this.outGoingResponseLogger.log(`${JSON.stringify(outgoingLogDetails)}`);
      })
    );
  }
} 