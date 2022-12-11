import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '../../shared/entity/core-entity';
import { UserEntity } from '../../user/entity/user.entity';

@Index(['sub'], { where: 'deleted_date is NULL', unique: true })
@Entity({ name: 'user_google_sub' })
export class UserGoogleSubEntity extends CoreEntity {
  @ApiProperty({ type: String })
  @Column({ type: 'uuid' })
  userId: string;

  @ApiProperty({ required: false, type: () => UserEntity })
  @OneToOne<UserEntity>(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: UserEntity;

  @ApiProperty({ type: String, required: false })
  @Column({ type: 'varchar', length: 300, nullable: true })
  sub: string;
}
