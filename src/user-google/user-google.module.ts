import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoogleModule } from '../shared-modules/google/google.module';
import { UserModule } from '../user/user.module';
import { userGoogleEntities } from './entity';
import { userServices } from './service';
import { UserGoogleSubFacade } from './user-google.facade';

@Module({
  imports: [UserModule, GoogleModule, ConfigModule, TypeOrmModule.forFeature(userGoogleEntities)],
  providers: [...userServices, UserGoogleSubFacade],
  exports: [TypeOrmModule, UserGoogleSubFacade],
})
export class UserGoogleModule {}
