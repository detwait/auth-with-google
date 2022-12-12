import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { UserGoogleModule } from '../user-google/user-google.module';
import { apiUserControllers } from './controller';

@Module({
  imports: [UserModule, UserGoogleModule],
  controllers: [...apiUserControllers],
})
export class ApiUserModule {}
