import { ModuleMetadata } from '@nestjs/common';

import { ApiUserController } from './api-user-controller';
import { ApiUserAuthGoogleController } from './api-user-google-auth-controller';
import { ApiUserProfileController } from './api-user-profile.controller';

export const apiUserControllers: ModuleMetadata['controllers'] = [
  ApiUserAuthGoogleController,
  ApiUserController,
  ApiUserProfileController,
];
