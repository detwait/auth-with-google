import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfigInput } from '../../shared/input/env-config.input';

export const accessSecretFactory: FactoryProvider = {
  provide: 'JWT_USER_ACCESS_SECRET',
  useFactory: (configService: ConfigService<EnvConfigInput>) => {
    return configService.get('JWT_USER_ACCESS_SECRET');
  },
  inject: [ConfigService],
};
