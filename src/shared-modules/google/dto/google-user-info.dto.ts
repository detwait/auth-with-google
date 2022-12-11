import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
 
@Exclude()
export class GoogleUserInfoDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name!: string;
}