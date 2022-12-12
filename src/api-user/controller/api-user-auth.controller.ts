import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserTokensDto } from '../../user/dto/user-tokens.dto';
import { UserRefreshJwtGuard } from '../../user/guard/user-refresh-jwt.guard';
import { UserFacade } from '../../user/user.facade';

 
@ApiTags('api-user-auth')
@Controller('api-user-auth')
@UseGuards(UserRefreshJwtGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ApiUserAuthController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiOperation({ summary: 'Refresh JWT tokens.' })
  @ApiCreatedResponse({ type: UserTokensDto })
  async refresh(@Req() { user: { id: userId } }): Promise<UserTokensDto> {
    return this.userFacade.auth.signIn(userId);
  }
}
