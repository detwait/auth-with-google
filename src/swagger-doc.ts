import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { ApiUserModule } from './api-user/api-user.module';
import { Pageable } from './shared/dto/pageable.dto';

export function swaggerDoc(app: INestApplication): OpenAPIObject {
  const options: any = new DocumentBuilder()
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .setTitle('Giftshop')
    .setDescription('Giftshop api')
    .addServer(process.env.SERVER_URL)
    .setVersion('1.1.1')
    .build();

  return SwaggerModule.createDocument(app, options, { extraModels: [Pageable], include: [ApiUserModule] });
}
