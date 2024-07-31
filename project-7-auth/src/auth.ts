import authConfig from "@/auth.config";
import { db } from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { getUserAccounts } from "./utils/db/db.utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;

        // const userAccounts = await getUserAccounts(user.id!);
        // console.log(
        //   "🚀 ~ file: auth.ts:16 ~ jwt ~ userAccounts:",
        //   userAccounts
        // );

        // token.account = userAccounts;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        // session.user.accounts = token.account as account[];

        // FIXME: as it need to be coming from token the going into the session for less db queries
        session.user.accounts = await getUserAccounts(token.id as string);
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
