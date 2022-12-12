
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function generateMockGoogleApis(sub: string, name: string, email: string) {
  class OAuth2 {
    getTokenInfo(): any {
      return {
        sub,
        email,
        email_verified: true,
      };
    }

    setCredentials(): any {}
  }

  return {
    oauth2: (): any => {
      return {
        userinfo: {
          get(): any {
            return {
              data: {
                name,
              },
            };
          },
        },
      };
    },
    auth: {
      OAuth2,
    },
  };
}