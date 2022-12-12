import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { userAuthStrategy } from '../constant/user-auth-strategy';

@Injectable()
export class UserJwtGuard extends AuthGuard(userAuthStrategy.user) {}
