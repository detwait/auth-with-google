
import { GeneratedUserApp } from '../generated-apps/generated-user-app';
import { TestApplication } from '../test-application';

export interface NewUserContext {
  userApp?: GeneratedUserApp;
  app?: TestApplication;
}
