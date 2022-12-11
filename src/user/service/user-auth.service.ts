import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { EnvConfigInput } from "../../shared/input/env-config.input";
import { UserTokensDto } from "../dto/user-tokens.dto";
import { UserAccessTokenPayload } from "../interface/user-access-token-payload";
import { UserRefreshTokenPayload } from "../interface/user-refresh-token-payload";
import { UserEntity } from "../entity/user.entity";
import { UserCreateParams } from "../params/user-create.params";

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly configService: ConfigService<EnvConfigInput>,
    private readonly jwtService: JwtService,
  ) {}

  private getRepository(entityManager?: EntityManager): Repository<UserEntity> {
    return entityManager? entityManager.getRepository(UserEntity) : this.userRepository;
  }

  async signUp(userParams: UserCreateParams, entityManager): Promise<UserEntity>  {
    return this.getRepository(entityManager).save({ ...userParams, email: userParams.email.toLowerCase() });
  }

  async signIn(userId: string): Promise<UserTokensDto> {
    const user: UserEntity = await this.userRepository.findOne({ 
      select: ['id', 'birthdayDate'], where: { id: userId} 
    });
    
    if (!user) {
      throw new BadRequestException('User not exist');
    }

    const accessToken: string = this.getAccessToken(userId, user.birthdayDate);
    const refreshToken: string = this.getRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async emailExists(email: string): Promise<boolean> {
    const existing: number = await this.userRepository.count({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });

    return existing > 0;
  }

  private getAccessToken(userId: string, birthdayDate: Date): string {
    const payload: UserAccessTokenPayload = { userId, birthdayDate };
    return this.jwtService.sign(payload);
  }

  private getRefreshToken(userId: string): string {
    const payload: UserRefreshTokenPayload = { userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_USER_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_USER_REFRESH_EXPIRES'),
    });
  }
}