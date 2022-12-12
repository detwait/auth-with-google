import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../../src/app.module';
import { validationPipeOptions } from '../../../src/shared/config/validation-pipe-options';

export async function createTestApp(): Promise<NestApplication> {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const APP: NestApplication = module.createNestApplication<NestApplication>();

  APP.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  await APP.init();
  await APP.getHttpAdapter().getInstance();
  return APP;
}
