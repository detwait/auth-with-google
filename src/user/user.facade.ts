import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { Pageable } from '../shared/dto/pageable.dto';
import { PageableRequestInput } from '../shared/input/pageable-request.input';
import { UserDto } from './dto/user.dto';
import { UserTokensDto } from './dto/user-tokens.dto';
import { UserEntity } from './entity/user.entity';
import { UserCreateParams } from './params/user-create.params';
import { UserService } from './service/user.service';
import { UserAuthService } from './service/user-auth.service';
import { UserProfileService } from './service/user-profile.service';

@Injectable()
export class UserFacade {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {}

  auth = {
    signIn: (userId: string): Promise<UserTokensDto> => this.userAuthService.signIn(userId),
    signUp: (userParams: UserCreateParams, entityManager?: EntityManager): Promise<UserEntity> =>
      this.userAuthService.signUp(userParams, entityManager),
    emailExists: (email: string): Promise<boolean> => this.userAuthService.emailExists(email),
  };

  data = {
    getById: (userId: string): Promise<UserDto> => this.userService.getById(userId),
    getMany: (input: PageableRequestInput): Promise<Pageable<UserDto>> => this.userService.getMany(input),
  };

  profile = {
    setBirthday: (userId: string, birthdayDate: string): Promise<UserTokensDto> => this.userProfileService.setBirthday(userId, birthdayDate),
  };
}
