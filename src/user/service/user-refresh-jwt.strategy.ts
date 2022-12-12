import { Inject, Injectable } from '@nestjs/common';
import { ContextId, ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { userAuthStrategy } from '../constant/user-auth-strategy';
import { UserEntity } from '../entity/user.entity';
import { UserRefreshTokenPayload } from '../interface/user-refresh-token-payload';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class UserRefreshJwtStrategy extends PassportStrategy(Strategy, userAuthStrategy.refresh) {
  constructor(
    @Inject('JWT_USER_REFRESH_SECRET')
    private readonly secretOrKey: string,
    private readonly moduleRef: ModuleRef,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, { userId }: UserRefreshTokenPayload): Promise<UserEntity> {
    const contextId: ContextId = ContextIdFactory.getByRequest(request);
    const userAuthService: UserAuthService = await this.moduleRef.resolve(UserAuthService, contextId);
    return userAuthService.getAuthenticatedUser(userId);
  }
}
