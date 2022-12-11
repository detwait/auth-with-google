import { Module } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envValidate } from './shared/helper/env-validate';
import { ApiUserModule } from './api-user/api-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigInput } from './shared/input/env-config.input';

const envFilePath: string = `.env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validate: envValidate,
    }),
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [new winston.transports.Console()],
      exitOnError: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvConfigInput>) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5438),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DBNAME'),
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE', false),
        dropSchema: false,
        autoLoadEntities: true,
        keepConnectionAlive: true,
        connectTimeoutMS: configService.get('ENV_MODE') === 'test' ? 99999 : 6000,
        maxQueryExecutionTime: 2000,
        extra: {
          max: 10,
          connectionLimit: 10,
          connectionTimeoutMillis: configService.get('ENV_MODE') === 'test' ? 99999 : 6000,
        },
        ssl: configService.get<boolean>('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false,
        logging: configService.get('ENV_MODE') !== 'local' ? ['error', 'warn'] : ['error', 'warn'],
      }),
    }),
    ApiUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
