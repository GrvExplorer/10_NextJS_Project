import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import resend from "next-auth/providers/resend";
import dbConnection from "./db";
import MongooseAdapter from "./db/mongoose-adpater";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    verifyRequest: "/verify-request",
    error: "/error",
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.seller = user.seller as boolean;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.token = token;
        session.user.seller = token.seller as boolean;
      }
      return session;
    },
  },
  adapter: MongooseAdapter(dbConnection),
  session: { strategy: "jwt" },
  providers: [
    ...authConfig.providers,
    resend({
      from: "Auth JS <onboarding@resend.dev>",
    }),
  ],
});
