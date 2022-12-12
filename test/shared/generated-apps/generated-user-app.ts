import { Pageable } from '../../../src/shared/dto/pageable.dto';
import { GoogleTokenVerificationInput } from '../../../src/shared-modules/google/input/google-token-verification.input';
import { UserDto } from '../../../src/user/dto/user.dto';
import { UserTokensDto } from '../../../src/user/dto/user-tokens.dto';
import { UserSetBirthdayInput } from '../../../src/user/input/user-set-birthday.input';
/*HTTP-client*/
import { TestApplication } from '../test-application';

export class GeneratedUserApp {
  private app: TestApplication;
  public tokens: UserTokensDto;

  constructor(app: TestApplication) {
    this.app = app;
  }

  apiUserAuthGoogle = {
    auth: (data: GoogleTokenVerificationInput, status: number = 201): Promise<UserTokensDto> =>
      this.app.request<UserTokensDto>({
        url: `/api-user-auth-google`,
        method: 'POST',
        status,
        payload: data,
        ...(this.tokens?.accessToken && { token: this.tokens.accessToken }),
      }),
  };

  apiUser = {
    getById: (id: string, status: number = 200): Promise<void> =>
      this.app.request<void>({
        url: `/api-user/${id}`,
        method: 'GET',
        status,
        ...(this.tokens?.accessToken && { token: this.tokens.accessToken }),
      }),

    getMany: (
      query: {
        limit: number;
        /** @example 1 */
        page: number;
      },
      status: number = 200,
    ): Promise<
      Pageable & {
        items?: UserDto[];
      }
    > =>
      this.app.request<
        Pageable & {
          items?: UserDto[];
        }
      >({
        url: `/api-user`,
        method: 'GET',
        status,
        query: query,
        ...(this.tokens?.accessToken && { token: this.tokens.accessToken }),
      }),
  };

  apiUserProfile = {
    setBirthday: (data: UserSetBirthdayInput, status: number = 201): Promise<UserTokensDto> =>
      this.app.request<UserTokensDto>({
        url: `/api-user-profile/birthday`,
        method: 'PATCH',
        status,
        payload: data,
        ...(this.tokens?.accessToken && { token: this.tokens.accessToken }),
      }),
  };
}
