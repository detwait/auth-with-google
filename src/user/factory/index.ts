import { ModuleMetadata } from '@nestjs/common';

import { accessSecretFactory } from './access-secret.factory';
import { refreshSecretFactory } from './refresh-secret.factory';

export const userFactories: ModuleMetadata['providers'] = [accessSecretFactory, refreshSecretFactory];
