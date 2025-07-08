import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getTranslation } from '../../translations/translation.util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const lang = req.lang || req.headers['x-lang'] || 'en';
    return next.handle().pipe(
      map((data) => {
        // If the handler returns { data, messageKey }, translate and wrap
        if (data && typeof data === 'object' && 'messageKey' in data) {
          return {
            success: true,
            data: data.data ?? null,
            message: getTranslation(data.messageKey, lang),
          };
        }
        // If the handler returns just data, wrap it
        return {
          success: true,
          data,
          message: '',
        };
      }),
    );
  }
} 