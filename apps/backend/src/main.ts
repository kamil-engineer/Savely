import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { EnvService } from './modules/config/env.service';
import { AllExceptionsFilter } from './shared/all-exception-filter/all-exception-filter';
import { LoggerService } from './shared/logger/logger.service';
import { SwaggerSetupService } from './shared/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(LoggerService);
  const swagger = app.get(SwaggerSetupService);

  const config = app.get(EnvService);

  const isProd = config.get('NODE_ENV') === 'production';

  app.useLogger(logger);

  app.useGlobalFilters(new AllExceptionsFilter(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  swagger.setup(app);

  app.use(
    helmet({
      contentSecurityPolicy: isProd
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "'unsafe-eval'",
                'https://savely-frontend.vercel.app',
              ],
              styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
              imgSrc: ["'self'", 'data:', 'https://savely-frontend.vercel.app'],
              fontSrc: ["'self'", 'https://fonts.gstatic.com'],
              connectSrc: ["'self'", 'https://savely-frontend.vercel.app'],
              objectSrc: ["'none'"],
              upgradeInsecureRequests: [],
            },
          }
        : false,
      crossOriginEmbedderPolicy: isProd,
      crossOriginOpenerPolicy: isProd ? { policy: 'same-origin' } : false,
      crossOriginResourcePolicy: isProd ? { policy: 'same-origin' } : false,
      referrerPolicy: { policy: 'no-referrer' },
      frameguard: { action: 'deny' },
      hsts: isProd ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
      noSniff: true,
      xssFilter: true,
    }),
  );

  app.enableCors({
    origin: isProd ? ['https://savely-frontend.vercel.app'] : ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await app.listen(config.get('PORT'));
}
bootstrap();
