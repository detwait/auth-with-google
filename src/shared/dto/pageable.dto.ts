import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

@Exclude()
export class Pageable<Item = void> {
  @Expose()
  items?: Item[];

  @ApiProperty({ required: true, type: Number, description: 'Number of items on the current page' })
  @Expose()
  @IsDefined()
  count!: number;

  @ApiProperty({ required: true, type: Number, description: 'Total number of items' })
  @Expose()
  @IsDefined()
  total!: number;

  @ApiProperty({ required: true, type: Number, description: 'Current page' })
  @Expose()
  @IsDefined()
  page!: number;

  @ApiProperty({ required: true, type: Number, description: 'Total number of pages' })
  @Expose()
  @IsDefined()
  pageCount!: number;
}
