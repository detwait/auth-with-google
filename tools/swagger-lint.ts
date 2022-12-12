import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';
import * as fs from 'fs'
import * as Enforcer from 'openapi-enforcer';

import { AppModule } from '../src/app.module';
import { validationPipeOptions } from '../src/shared/config/validation-pipe-options';
import { swaggerDoc } from '../src/swagger-doc';

async function swaggerLint(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const document: OpenAPIObject = swaggerDoc(app);
  fs.writeFileSync(`./swagger/user.json`, JSON.stringify(document, null, '  '));

  await app.close();

  const options: any = {
    fullResult: true,
    componentOptions: {
      exceptionSkipCodes: ['WRES001'],
    },
  }

  // eslint-disable-next-line @typescript-eslint/typedef
  Enforcer('swagger/user.json', options).then(function ({ error, warning }) {
    if (warning) {
      // eslint-disable-next-line no-console
      console.warn(warning);
    }
    if (!error) {
      // eslint-disable-next-line no-console
      console.log('No errors in user.json');
    } else {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  return;
}

// eslint-disable-next-line no-console
swaggerLint().then(() => console.log('Validation complete.'));
