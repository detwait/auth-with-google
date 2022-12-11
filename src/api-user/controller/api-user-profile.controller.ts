import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParamInput } from '../../shared/input/id-param.input';
import { UserTokensDto } from '../../user/dto/user-tokens.dto';
import { UserSetBirthdayInput } from '../../user/input/user-set-birthday.input';
import { UserFacade } from '../../user/user.facade';

 
@ApiTags('api-user-profile')
@Controller('api-user-profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ApiUserProfileController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiOperation({ summary: 'Set user birthday' })
  @Patch(":id/birthday")
  async setBirthday(@Param() { id }: IdParamInput, @Body() { birthdayDate }: UserSetBirthdayInput): Promise<UserTokensDto> {
    return this.userFacade.profile.setBirthday(id, birthdayDate);
  }
}
