import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

import { EnvConfigInput } from '../input/env-config.input';

export function envValidate(config: Record<string, unknown>): EnvConfigInput {
  const validatedConfig: EnvConfigInput = plainToClass(EnvConfigInput, config, {
    enableImplicitConversion: true,
  });

  const errors: ValidationError[] = validateSync(validatedConfig, { skipMissingProperties: true });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
