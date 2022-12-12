import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsEmail, IsString } from 'class-validator';

@Exclude()
export class UserDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsDefined()
  @Expose()
  id!: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsDefined()
  @Expose()
  name!: string;

  @ApiProperty({ type: String, required: true })
  @IsEmail()
  @IsDefined()
  @Expose()
  email!: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsDefined()
  @Expose()
  birthDay?: string;
}
