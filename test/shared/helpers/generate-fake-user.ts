import * as faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

import { FakeUser } from '../type/fake-user';

export function GenerateFakeUser(): FakeUser {
  const gender: number = Math.round(Math.random());
  const name: string = `${faker.name.firstName(gender)}${faker.name.lastName(gender)}`.toLowerCase();
  const email: string = `${name}.${uuidv4().slice(0, 4)}@google.com`.toLowerCase();

  return {
    name,
    email,
  };
}
