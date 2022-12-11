import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";


import { userServices } from "./service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userGoogleEntities } from "./entity";
import { UserModule } from "../user/user.module";
import { UserGoogleSubFacade } from "./user-google.facade";
import { GoogleModule } from "../shared-modules/google/google.module";

@Module({
  imports: [
    UserModule,
    GoogleModule,
    ConfigModule,
    TypeOrmModule.forFeature(userGoogleEntities),
  ],
  providers: [...userServices, UserGoogleSubFacade],
  exports: [TypeOrmModule, UserGoogleSubFacade],
})
export class UserGoogleModule {}