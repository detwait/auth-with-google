import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../shared/decorator/api-paginated-response';
import { Pageable } from '../../shared/dto/pageable.dto';
import { IdParamInput } from '../../shared/input/id-param.input';
import { PageableRequestInput } from '../../shared/input/pageable-request.input';
import { UserDto } from '../../user/dto/user.dto';
import { UserFacade } from '../../user/user.facade';

 
@ApiTags('api-user')
@Controller('api-user')
@UseInterceptors(ClassSerializerInterceptor)
export class ApiUserController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiOperation({ summary: 'Get user by id' })
  @Get(":id")
  async getById(@Param() { id }: IdParamInput): Promise<UserDto> {
    return this.userFacade.data.getById(id);
  }
  
  @ApiOperation({ summary: 'Get many users' })
  @ApiExtraModels(UserDto)
  @ApiPaginatedResponse(UserDto)
  @Get()
  async getMany(@Query() input: PageableRequestInput): Promise<Pageable<UserDto>> {
    return this.userFacade.data.getMany(input);
  }
}
