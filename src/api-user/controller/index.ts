import { ModuleMetadata } from '@nestjs/common';

import { ApiUserAuthController } from './api-user-auth.controller';
import { ApiUserAuthGoogleController } from './api-user-auth-google-controller';
import { ApiUserController } from './api-user-controller';
import { ApiUserProfileController } from './api-user-profile.controller';

export const apiUserControllers: ModuleMetadata['controllers'] = [
  ApiUserAuthGoogleController,
  ApiUserController,
  ApiUserProfileController,
  ApiUserAuthController,
];
