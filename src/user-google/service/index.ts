import { ModuleMetadata } from '@nestjs/common';

import { UserGoogleAuthService } from './user-google-auth.service';

export * from './user-google-auth.service';

export const userServices: ModuleMetadata['providers'] = [UserGoogleAuthService];
