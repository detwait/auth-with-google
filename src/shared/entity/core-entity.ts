import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class CoreEntity {
  @ApiProperty({ type: String, readOnly: true, required: true })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id?: string;

  @ApiProperty({ type: Date, required: false })
  @CreateDateColumn({ select: true })
  create_date?: Date;

  @ApiProperty({ type: Date, required: false })
  @UpdateDateColumn({ name: 'update_date', select: true })
  update_date?: Date;

  @VersionColumn({ select: false })
  version?: number;

  @ApiProperty({ type: Date, required: false })
  @DeleteDateColumn({ name: 'deleted_date', select: true })
  deleted_date?: Date;
}
