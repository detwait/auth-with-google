import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

@Exclude()
export class UserSetBirthdayInput {
  @ApiProperty({ type: String, required: true })
  @IsDefined()
  @Expose()
  birthdayDate!: Date;
}
