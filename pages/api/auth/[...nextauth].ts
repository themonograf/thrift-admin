import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import authServices from "services/authentication";

async function refreshAccessToken(token) {
  try {
    const tokenResponse = await fetch(authServices.refresh.url, {
      method: authServices.refresh.method,
      body: JSON.stringify({ refreshToken: token.refreshToken }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    });
    const newAccessToken = await tokenResponse.json();

    return {
      accessToken: newAccessToken.accessToken,
      expiresAt: newAccessToken.expiresAt * 1000,
      refreshToken: newAccessToken.refreshToken,
      user: token.user,
    };
  } catch (error) {
    return {
      ...error,
      status: 401,
      message: "RefreshAccessTokenError",
      code: "RefreshAccessTokenError",
    };
  }
}

const providers = [
  CredentialProvider({
    name: "credentials",
    credentials: {},
    authorize: async (credentials) => {
      try {
        const result = await fetch(authServices.login.url, {
          method: authServices.login.method,
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await result.json();

        if (result.ok && user.accessToken) {
          return {
            ...user?.data,
            profile: user?.data,
            accessToken: user.accessToken,
            expiresAt: user.expiresAt * 1000,
            refreshToken: user.refreshToken,
          };
        }

        return null;
      } catch (error) {
        return error;
      }
    },
  }),
];

const callbacks = {
  redirect: async ({ baseUrl }) => {
    return baseUrl;
  },
  jwt: async ({ token, user, account }) => {
    if (account && user) {
      return {
        accessToken: user.accessToken,
        expiresAt: user.expiresAt,
        refreshToken: user.refreshToken,
        user: user.profile,
      };
    }

    if (Date.now() < token?.expiresAt) {
      return Promise.resolve(token);
    }

    // Return previous token if the access token has not expired yet
    return refreshAccessToken(token);
  },
  session: async ({ session, token }) => {
    session.accessToken = token.accessToken;
    session.expiresAt = new Date(token?.expiresAt).toISOString();
    session.expiresAt = new Date(token?.expiresAt).toISOString();
    session.user = token.user;
    session.error = token.error;

    return Promise.resolve(session);
  },
};

export const options = {
  providers,
  callbacks,
  pages: {
    signIn: "/auth/login",
  },
};

const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;
