import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsUUID } from 'class-validator';

@Exclude()
export class IdParamInput {
  @ApiProperty({ type: String, required: true })
  @IsUUID('4')
  @IsDefined()
  @Expose()
  id!: string;
}
