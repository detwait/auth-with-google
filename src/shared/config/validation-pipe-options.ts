import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

import { exceptionFactory } from '../helper/exception-factory';

export const validationPipeOptions: ValidationPipeOptions = {
  skipMissingProperties: true,
  skipNullProperties: false,
  skipUndefinedProperties: true,
  validateCustomDecorators: true,
  whitelist: true,
  transform: true,
  exceptionFactory,
  transformOptions: {
    enableImplicitConversion: true,
    exposeUnsetFields: false,
  },
};
