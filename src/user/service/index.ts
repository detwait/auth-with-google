import { ModuleMetadata } from '@nestjs/common';

import { UserAuthService } from './user-auth.service';
import { UserJwtStrategy } from './user-jwt.strategy';
import { UserMemberJwtStrategy } from './user-member-jwt.strategy';
import { UserProfileService } from './user-profile.service';
import { UserService } from './user.service';

export const userServices: ModuleMetadata['providers'] = [
  UserAuthService,
  UserService,
  UserProfileService,
  UserMemberJwtStrategy,
  UserJwtStrategy,
];
