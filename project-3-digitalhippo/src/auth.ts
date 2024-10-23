import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import resend from "next-auth/providers/resend";
import dbConnection from "./db";
import MongooseAdapter from "./db/mongoose-adpater";
import { trpc } from "./trpc/server";

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
        token.isSeller = user.isSeller as boolean;
        token.sellerId = user.sellerId as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.isSeller = token.isSeller as boolean;
        session.user.sellerId = token.sellerId as string;
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
