import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IsAuthenticatedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];
    if (!auth) {
      throw new UnauthorizedException('Missing Authorization header');
    }
    // You can add more logic here (e.g., JWT validation)
    next();
  }
} 