import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParamInput } from '../../shared/input/id-param.input';
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
  @Patch(":id/birthday")
  async setBirthday(@Param() { id }: IdParamInput, @Body() { birthdayDate }: UserSetBirthdayInput): Promise<UserTokensDto> {
    return this.userFacade.profile.setBirthday(id, birthdayDate);
  }
}
