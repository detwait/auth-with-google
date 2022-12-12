import { ModuleMetadata } from '@nestjs/common';

import { UserService } from './user.service';
import { UserAuthService } from './user-auth.service';
import { UserJwtStrategy } from './user-jwt.strategy';
import { UserMemberJwtStrategy } from './user-member-jwt.strategy';
import { UserProfileService } from './user-profile.service';
import { UserRefreshJwtStrategy } from './user-refresh-jwt.strategy';

export const userServices: ModuleMetadata['providers'] = [
  UserAuthService,
  UserService,
  UserProfileService,
  UserMemberJwtStrategy,
  UserJwtStrategy,
  UserRefreshJwtStrategy,
];
