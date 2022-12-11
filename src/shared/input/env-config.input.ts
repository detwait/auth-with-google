import { Exclude, Expose, Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class EnvConfigInput {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  ENV_MODE: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  NODE_ENV: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  SERVER_NAME: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  SERVER_URL: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  APP_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @Type(() => Number)
  @Expose()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  DATABASE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  DATABASE_DBNAME: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  DATABASE_USER: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  DATABASE_PASSWORD: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  @Type(() => Boolean)
  @Expose()
  DATABASE_SYNCHRONIZE: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  @Type(() => Boolean)
  @Expose()
  DATABASE_DROP_SCHEMA: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  @Type(() => Boolean)
  @Expose()
  DATABASE_LOGGING: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  DATABASE_SSL: boolean;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  JWT_USER_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  JWT_USER_ACCESS_EXPIRES: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  JWT_USER_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Expose()
  JWT_USER_REFRESH_EXPIRES: string;
}
