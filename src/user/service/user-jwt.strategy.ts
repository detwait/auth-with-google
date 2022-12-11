import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextId, ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userAuthStrategy } from '../constant/user-auth-strategy';
import { UserEntity } from '../entity/user.entity';

import { UserAccessTokenPayload } from '../interface/user-access-token-payload';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, userAuthStrategy.user) {
  constructor(
    @Inject('JWT_USER_ACCESS_SECRET')
    private readonly secretOrKey: string,
    private readonly moduleRef: ModuleRef,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, { userId }: UserAccessTokenPayload): Promise<UserEntity> {
    const contextId: ContextId = ContextIdFactory.getByRequest(request);
    const userAuthService: UserAuthService = await this.moduleRef.resolve(UserAuthService, contextId);
    return userAuthService.getAuthenticatedUser(userId);
  }
}
