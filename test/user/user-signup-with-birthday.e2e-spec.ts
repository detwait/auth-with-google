
// eslint-disable-next-line simple-import-sort/imports
import * as faker from 'faker';
// eslint-disable-next-line simple-import-sort/imports
import { GenerateFakeUser } from '../shared/helpers/generate-fake-user';
// eslint-disable-next-line simple-import-sort/imports
import { generateMockGoogleApis } from '../mock/googleapis.mock';

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
import { TestApplication } from '../shared/test-application';

describe('User sign-up (e2e)', () => {
  let app: TestApplication;
  let userApp: GeneratedUserApp;

  beforeAll(async () => {
    app = new TestApplication();
    await app.init();
    userApp = new GeneratedUserApp(app);
  });

  it('Set birthday: fail auth', async () => {
    await userApp.apiUserProfile.setBirthday({ birthdayDate: '1991-03-15' }, 401);
  });

  it('Get users list: fail auth', async () => {
    await userApp.apiUser.getMany({ limit: 100, page: 1 }, 401);
  });

  it('Sign in with google', async () => {
    const { accessToken, refreshToken } = await userApp.apiUserAuthGoogle.auth({
      access_token: 'dadasdsa',
    });

    userApp.tokens = {
      accessToken,
      refreshToken,
    };

    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it('Get users list: fail auth', async () => {
    await userApp.apiUser.getMany({ limit: 100, page: 1 }, 401);
  });

  it('Set birthday', async () => {
    const oldAccessToken: string = userApp.tokens.accessToken;
    const { accessToken, refreshToken } = await userApp.apiUserProfile.setBirthday({ birthdayDate: '1991-03-15' }, 200);

    userApp.tokens = {
      accessToken,
      refreshToken,
    };

    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
    expect(accessToken).not.toBe(oldAccessToken);
  });

  it('Get users list', async () => {
    const { items } = await userApp.apiUser.getMany({ limit: 100, page: 1 });
    expect(items.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});
