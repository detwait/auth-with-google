import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { UserGoogleSubEntity } from './user-google-sub.entity';

export const userGoogleEntities: EntityClassOrSchema[] = [UserGoogleSubEntity];
