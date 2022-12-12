import { GeneratedUserApp } from '../generated-apps/generated-user-app';
import { NewUserContext } from '../interface/new-user-context';
import { TestApplication } from '../test-application';

export function addNewUser(context: NewUserContext): NewUserContext {
  let app: TestApplication;
  let userApp: GeneratedUserApp;

  beforeAll(async () => {
    if (context.app) {
      app = context.app;
    } else {
      app = new TestApplication();
      await app.init();
    }

    userApp = new GeneratedUserApp(app);
    context.userApp = userApp;
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

  context.userApp = userApp;
  return context;
}
