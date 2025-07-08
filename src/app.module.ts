import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DummyModule } from './modules/dummy/dummy.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from './config/config.service';
import { IsAuthenticatedMiddleware } from './auth/middleware/isauthenticated.middleware';
import { LanguageInterceptor } from './common/interceptors/language.interceptor';
import { PrismaModule } from './prisma/prisma.module';

/**
 * The root module of the application.
 * Sets up global providers, modules, and middleware.
 */
@Module({
  imports: [
    // Import the Dummy feature module
    DummyModule,
    // Import PrismaModule for global PrismaService
    PrismaModule,
    // Configure Winston logger for global logging
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    // Register global interceptors for language, response, and logging
    {
      provide: APP_INTERCEPTOR,
      useClass: LanguageInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  /**
   * Configure global middleware (e.g., authentication)
   * @param consumer - Middleware consumer
   */
  configure(consumer: MiddlewareConsumer) {
    // Example: Apply authentication middleware globally
    // consumer.apply(IsAuthenticatedMiddleware).forRoutes('*');
  }
}
