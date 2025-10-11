import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly",
        },
      },
    }),
  ],
  callbacks: {
    // JWT callback: store Google access token
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    // Session callback: make accessToken available on session
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },

    // Redirect callback: redirect user after login
    async redirect({ url, baseUrl }) {
      // Redirect to homepage or your email page
      // Change `/` to `/dashboard` or `/emails` if you have a separate page
      return `${baseUrl}/`;
    },
  },
};

export default NextAuth(authOptions);
