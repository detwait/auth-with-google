
// eslint-disable-next-line simple-import-sort/imports
import * as faker from 'faker';
// eslint-disable-next-line simple-import-sort/imports
import { GenerateFakeUser } from '../shared/helpers/generate-fake-user';
// eslint-disable-next-line simple-import-sort/imports
import { generateMockGoogleApis } from '../shared/mock/googleapis.mock';

const { name, email } = GenerateFakeUser();
const sub: string = `${faker.lorem.sentence(26)}`.toLowerCase();

// eslint-disable-next-line simple-import-sort/imports
jest.mock('googleapis', () => {
  return {
    __esModule: true,
    google: generateMockGoogleApis(sub, name, email),
  };
});

import { GeneratedUserApp } from '../shared/generated-apps/generated-user-app';
import { addNewUser } from '../shared/helpers/add-new-user';
import { NewUserContext } from '../shared/interface/new-user-context';
import { TestApplication } from '../shared/test-application';

let app: TestApplication;
let userApp: GeneratedUserApp;
const context: NewUserContext = {};

describe('Create user (e2e)', () => {
  addNewUser(context);

  it('User app initialized', function () {
    userApp = context.userApp;
    expect(context.userApp).toBeDefined();
  });
});

describe('User api (e2e)', () => {
  beforeAll(async () => {
    app = userApp.getTestApp();
  });

  it('Get users list', async () => {
    const { items } = await context.userApp.apiUser.getMany({ limit: 100, page: 1 });
    expect(items.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});
