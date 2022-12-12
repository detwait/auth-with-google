import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { validationPipeOptions } from './shared/config/validation-pipe-options';
import { AllExceptionsFilter } from './shared/filter/all-exceptions.filter';
import { swaggerDoc } from './swagger-doc';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: ['error'],
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const nestWinston: any = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(nestWinston);
  app.useGlobalFilters(new AllExceptionsFilter(nestWinston));

  const document: OpenAPIObject = swaggerDoc(app);
  SwaggerModule.setup('api', app, document);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await app.listen(process.env.APP_PORT || 4000, process.env.APP_HOST || '0.0.0.0');
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
