import { ModuleMetadata } from '@nestjs/common';

import { GoogleAuthService } from './google-auth.service';

export * from './google-auth.service';

export const googleServices: ModuleMetadata['providers'] = [
  GoogleAuthService,
];
