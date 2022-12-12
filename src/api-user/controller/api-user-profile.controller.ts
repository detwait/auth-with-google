import { Body, ClassSerializerInterceptor, Controller, Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequestWithPayload } from '../../shared/interface/request-with-payload';
import { UserTokensDto } from '../../user/dto/user-tokens.dto';
import { UserJwtGuard } from '../../user/guard/user-jwt.guard';
import { UserSetBirthdayInput } from '../../user/input/user-set-birthday.input';
import { UserFacade } from '../../user/user.facade';

@ApiTags('api-user-profile')
@Controller('api-user-profile')
@UseGuards(UserJwtGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ApiUserProfileController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiOperation({ summary: 'Set user birthday' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: UserTokensDto })
  @Patch('birthday')
  async setBirthday(@Req() { user: { id: userId } }: RequestWithPayload, @Body() input: UserSetBirthdayInput): Promise<UserTokensDto> {
    return this.userFacade.profile.setBirthday(userId, input.birthdayDate);
  }
}
