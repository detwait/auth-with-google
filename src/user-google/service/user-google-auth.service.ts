import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'googleapis';
import { EntityManager, Repository } from 'typeorm';

import { GoogleFacade } from '../../shared-modules/google/google.facade';
import { UserTokensDto } from '../../user/dto/user-tokens.dto';
import { UserEntity } from '../../user/entity/user.entity';
import { UserFacade } from '../../user/user.facade';
import { UserGoogleSubEntity } from '../entity/user-google-sub.entity';
import { UserGoogleSubCreateParams } from '../params/user-google-sub-create.params';

@Injectable()
export class UserGoogleAuthService {
  constructor(
    @InjectRepository(UserGoogleSubEntity)
    private readonly userGoogleSubRepository: Repository<UserGoogleSubEntity>,

    private readonly globalEntityManager: EntityManager,
    private readonly userFacade: UserFacade,
    private readonly googleFacade: GoogleFacade,
  ) {}

  private getRepository(entityManager?: EntityManager): Repository<UserGoogleSubEntity> {
    return entityManager ? entityManager.getRepository(UserGoogleSubEntity) : this.userGoogleSubRepository;
  }

  findBySub(sub: string): Promise<UserGoogleSubEntity> {
    return this.userGoogleSubRepository.findOne({ where: { sub } });
  }

  async create(userGoogleSubCreateParams: UserGoogleSubCreateParams, entityManager?: EntityManager): Promise<UserGoogleSubEntity> {
    return this.getRepository(entityManager).save({ ...userGoogleSubCreateParams });
  }

  async signIn(token: string): Promise<UserTokensDto> {
    const { sub, email }: Auth.TokenInfo = await this.googleFacade.auth.getTokenInfo(token);
    const { name } = await this.googleFacade.auth.getUserInfo();

    let userGoogleSub: UserGoogleSubEntity = await this.findBySub(sub);

    if (!userGoogleSub) {
      const emailExists: boolean = await this.userFacade.auth.emailExists(email);

      if (emailExists) {
        throw new BadRequestException('User with such google email already exists');
      }

      const newUser: UserEntity = await this.userFacade.auth.signUp({ email, name }, this.globalEntityManager);
      userGoogleSub = await this.create({ sub, userId: newUser.id }, this.globalEntityManager);
    }

    return this.userFacade.auth.signIn(userGoogleSub.userId);
  }
}
