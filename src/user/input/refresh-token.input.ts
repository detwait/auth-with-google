import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsJWT, IsNotEmpty } from 'class-validator';

@Exclude()
export class RefreshTokenInput {
  @ApiProperty({ required: true, type: String })
  @IsJWT()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  refreshToken!: string;
}
