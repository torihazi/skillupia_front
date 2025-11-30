import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [Google],
  callbacks: {
    // override default jwt callback
    jwt: async ({ token, account }) => {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        };
      }

      // TODO: token rotationは後々実装する

      return token;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        // このaccess_tokenを使って rails のapiに投げる
        accessToken: token.accessToken,
        // refresh token は 露出させる必要がないので、ここでは設定しない
        // rails apiに投げるまでに tokenがexpireしたら401が帰って、落ちるからそれは良い。
      };
    },
  },
});
