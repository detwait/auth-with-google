import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @Patch("birthday")
  async setBirthday(@Req() { user: { id: userId }}, @Body() { birthdayDate }: UserSetBirthdayInput): Promise<UserTokensDto> {
    console.log(userId);
    return this.userFacade.profile.setBirthday(userId, birthdayDate);
  }
}
