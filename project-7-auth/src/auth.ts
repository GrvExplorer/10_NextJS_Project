import authConfig from "@/auth.config";
import { db } from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { getCurrentUserById, getUserAccounts } from "./utils/db/db.utils";
import { generateVerificationToken } from "./utils/db/verification-token.utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getCurrentUserById(user.id as string);
      
      if (!existingUser?.emailVerified) return false;
  
      return true;
    },

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
