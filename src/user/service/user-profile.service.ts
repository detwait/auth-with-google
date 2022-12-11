import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserTokensDto } from "../dto/user-tokens.dto";
import { UserEntity } from "../entity/user.entity";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userAuthService: UserAuthService,
  ) {}

  async setBirthday(userId: string, birthdayDate: Date): Promise<UserTokensDto> {
    const user: UserEntity = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    await this.userRepository.update(userId, { birthdayDate });

    return this.userAuthService.signIn(userId);
  }
}