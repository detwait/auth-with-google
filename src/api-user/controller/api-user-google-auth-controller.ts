import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleTokenVerificationInput } from '../../shared-modules/google/input/google-token-verification.input';
import { UserGoogleSubFacade } from '../../user-google/user-google.facade';
import { UserTokensDto } from '../../user/dto/user-tokens.dto';

 
@ApiTags('api-user-auth-google')
@Controller('api-user-auth-google')
@UseInterceptors(ClassSerializerInterceptor)
export class ApiUserAuthGoogleController {
  constructor(private readonly userGoogleSubFacade: UserGoogleSubFacade) {}
  
  @ApiOperation({ summary: 'SignUp/signIn with with google token' })
  @ApiCreatedResponse({ type: UserTokensDto })
  @Post()
  async auth(@Body() body: GoogleTokenVerificationInput): Promise<UserTokensDto> {
    return this.userGoogleSubFacade.auth.signIn(body.access_token);
  }
}
