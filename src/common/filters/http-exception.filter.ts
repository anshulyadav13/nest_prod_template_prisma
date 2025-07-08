import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getTranslation } from '../../translations/translation.util';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let langHeader = request.headers['x-lang'];
    let lang = Array.isArray(langHeader) ? langHeader[0] : langHeader || 'en';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null && (res as any).message) {
        message = (res as any).message;
      }
    } else if (exception && exception.message) {
      message = exception.message;
    }

    // Translate message if it's a known key
    message = getTranslation(message, lang);

    response.status(status).json({
      success: false,
      data: null,
      message,
    });
  }
} 