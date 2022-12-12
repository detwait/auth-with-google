import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Not, Repository, SelectQueryBuilder } from 'typeorm';

import { Pageable } from '../../shared/dto/pageable.dto';
import { PageableRequestInput } from '../../shared/input/pageable-request.input';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { mapUserEntityToDto } from '../mapper/user-entity-dto.mappers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private getRepository(entityManager?: EntityManager): Repository<UserEntity> {
    return entityManager ? entityManager.getRepository(UserEntity) : this.userRepository;
  }

  async getById(userId: string): Promise<UserDto> {
    const user: UserEntity = await this.userRepository.findOneBy({ id: userId });
    return mapUserEntityToDto(user);
  }

  async getMany({ limit, page }: PageableRequestInput): Promise<Pageable<UserDto>> {
    const qb: SelectQueryBuilder<UserEntity> = this.getRepository()
      .createQueryBuilder('user')
      .select()
      .where({ birthdayDate: Not(IsNull()) })
      .take(limit)
      .skip((page - 1) * limit);

    const total: number = await qb.getCount();
    const items: UserEntity[] = await qb.getMany();

    return {
      pageCount: Math.ceil(total / limit) || 0,
      count: items.length,
      page,
      items: items.map((entity: UserEntity) => mapUserEntityToDto(entity)),
      total,
    };
  }
}
