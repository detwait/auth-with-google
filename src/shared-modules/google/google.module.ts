import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GoogleFacade } from './google.facade';
import { googleServices } from './service';

@Module({
  imports: [ConfigModule],
  providers: [...googleServices, GoogleFacade],
  exports: [GoogleFacade],
})
export class GoogleModule {}
