import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfigInput } from '../../shared/input/env-config.input';

export const refreshSecretFactory: FactoryProvider = {
  provide: 'JWT_USER_REFRESH_SECRET',
  useFactory: (configService: ConfigService<EnvConfigInput>) => {
    return configService.get('JWT_USER_REFRESH_SECRET');
  },
  inject: [ConfigService],
};
