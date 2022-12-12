import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class GoogleUserInfoDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name!: string;
}
