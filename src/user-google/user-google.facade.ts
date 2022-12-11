import { Injectable } from '@nestjs/common';

import { UserTokensDto } from '../user/dto/user-tokens.dto';
import { UserGoogleAuthService } from './service/user-google-auth.service';

@Injectable()
export class UserGoogleSubFacade {
  constructor(
    private readonly userGoogleAuthService: UserGoogleAuthService,
  ) {}

  auth = {
    signIn: (token: string): Promise<UserTokensDto> => this.userGoogleAuthService.signIn(token),
  }
}
