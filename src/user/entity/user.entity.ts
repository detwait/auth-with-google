import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index } from 'typeorm';

import { CoreEntity } from '../../shared/entity/core-entity';

@Index(['email'], { where: 'deleted_date is NULL', unique: true })
@Entity({ name: 'user' })
export class UserEntity extends CoreEntity {
  @ApiProperty({ type: String, required: true })
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @ApiProperty({ type: String, required: true })
  @Column({ type: 'varchar', length: 300 })
  email: string;

  @ApiProperty({ type: Date, required: false })
  @Column({ type: 'timestamp', nullable: true })
  birthdayDate: Date;
}
