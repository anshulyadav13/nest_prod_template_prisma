import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import basicAuth from 'express-basic-auth';

/**
 * The entry point of the application.
 * Bootstraps the NestJS app, enables CORS, and sets up Swagger documentation.
 */
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);
  // Enable Cross-Origin Resource Sharing
  app.enableCors();

  // Register the global exception filter
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  // Protect Swagger UI with basic auth
  app.use(
    ['/api', '/api-json'],
    basicAuth({
      challenge: true,
      users: {
        ...(process.env.SWAGGER_USER && process.env.SWAGGER_PASSWORD
          ? { [String(process.env.SWAGGER_USER)]: String(process.env.SWAGGER_PASSWORD) }
          : {}),
      },
    }),
  );

  // Configure Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('MS API')
    .setDescription('API documentation for Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server on the specified port
  console.log(`localhost:${process.env.PORT ?? 9090}`);
  await app.listen(process.env.PORT ?? 9090);
}

// Bootstrap the application
bootstrap();
