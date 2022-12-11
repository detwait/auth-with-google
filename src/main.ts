import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiUserModule } from './api-user/api-user.module';
import { AppModule } from './app.module';
import { Pageable } from './shared/dto/pageable.dto';
import { AllExceptionsFilter } from './shared/filter/all-exceptions.filter';
import { exceptionFactory } from './shared/helper/exception-factory';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: ['error'],
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      skipNullProperties: true,
      skipUndefinedProperties: true,
      exceptionFactory,
    }),
  );

  const nestWinston: any = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(nestWinston);
  app.useGlobalFilters(new AllExceptionsFilter(nestWinston));

  const options: any = new DocumentBuilder()
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .setTitle('Giftshop')
    .setDescription('Giftshop api')
    .addServer(process.env.SERVER_URL)
    .setVersion('1.1.1')
    .build();

  const document: any = SwaggerModule.createDocument(app, options, { extraModels: [Pageable], include: [ ApiUserModule ] });
  SwaggerModule.setup('api', app, document);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await app.listen(
    process.env.APP_PORT || 4000,
    process.env.APP_HOST || '0.0.0.0',
  );
}

bootstrap();
