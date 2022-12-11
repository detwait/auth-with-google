import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserFacade } from "./user.facade";

import { userServices } from "./service";
import { JwtModule } from "@nestjs/jwt";
import { EnvConfigInput } from "../shared/input/env-config.input";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userEntities } from "./entity";
import { userFactories } from "./factory";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvConfigInput>) => ({
        secret: configService.get('JWT_USER_ACCESS_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_USER_ACCESS_EXPIRES') },
      }),
    }),
    ConfigModule,
    TypeOrmModule.forFeature(userEntities),
  ],
  providers: [...userFactories, ...userServices, UserFacade],
  exports: [TypeOrmModule, UserFacade],
})
export class UserModule {}