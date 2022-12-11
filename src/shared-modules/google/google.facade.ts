import { Injectable } from '@nestjs/common';
import { Auth } from 'googleapis';

import { GoogleUserInfoDto } from './dto/google-user-info.dto';
import { GoogleAuthService } from './service/google-auth.service';

@Injectable()
export class GoogleFacade {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  auth = {
    getTokenInfo: (token: string): Promise<Auth.TokenInfo> => this.googleAuthService.getTokenInfo(token),
    getUserInfo: (): Promise<GoogleUserInfoDto> => this.googleAuthService.getUserInfo(),
  }
}
