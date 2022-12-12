import { ModuleMetadata } from '@nestjs/common';

import { ApiUserController } from './api-user-controller';
import { ApiUserAuthGoogleController } from './api-user-auth-google-controller';
import { ApiUserProfileController } from './api-user-profile.controller';
import { ApiUserAuthController } from './api-user-auth.controller';

export const apiUserControllers: ModuleMetadata['controllers'] = [
  ApiUserAuthGoogleController,
  ApiUserController,
  ApiUserProfileController,
  ApiUserAuthController,
];
