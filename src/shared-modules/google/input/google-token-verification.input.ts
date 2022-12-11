import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
 
@Exclude()
export class GoogleTokenVerificationInput {
  @ApiProperty({
    required: true,
    maxLength: 200,
    example: 'dashdjlashdashdaskjdhaksdhgk',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  access_token: string;
}