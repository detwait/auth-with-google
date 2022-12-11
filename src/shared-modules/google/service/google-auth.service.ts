import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';
import { EnvConfigInput } from '../../../shared/input/env-config.input';
import { GoogleUserInfoDto } from '../dto/google-user-info.dto';

@Injectable()
export class GoogleAuthService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService<EnvConfigInput>,
  ) {
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
 
    this.oauthClient = new google.auth.OAuth2(
      clientID,
      clientSecret
    );
  }

  async getTokenInfo(token: string): Promise<Auth.TokenInfo> {
    const tokenInfo: Auth.TokenInfo =  await this.oauthClient.getTokenInfo(token);

    if (!tokenInfo.email_verified) {
      throw new UnauthorizedException(`Google email must be verified`);
    }

    this.oauthClient.setCredentials({
      access_token: token
    })
  
    return tokenInfo;
  }
   
  async getUserInfo(): Promise<GoogleUserInfoDto> {
    const userInfoClient = google.oauth2('v2').userinfo;
    const userInfoResponse = await userInfoClient.get({ auth: this.oauthClient });
    const { name } = userInfoResponse.data;

    return {
      name,
    };
  }
}