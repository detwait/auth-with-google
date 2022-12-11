import { Module } from '@nestjs/common';

import { UserGoogleModule } from '../user-google/user-google.module';
import { UserModule } from '../user/user.module';
import { apiUserControllers } from './controller';

@Module({
  imports: [
    UserModule,
    UserGoogleModule,
  ],
  controllers: [...apiUserControllers],
})
export class ApiUserModule {}
