import { AccountNotLinked, CredentialsSignin } from "@auth/core/errors";
import bcrypt from "bcryptjs";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { db } from "./db";
import { loginSchema } from "./schemas";
import { getCurrentUserByEmail } from "./utils/db/db.utils";

export default {
  providers: [
    // FIXME: catch the error here and send valid response
    Credentials({
      authorize: async (credentials) => {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) {
          console.log("validation error");
          return { success: false, message: "Something went wrong" };
        }

        const { email, password } = validated.data;

        // TODO: Create Utils for this type of functions
        const user = await getCurrentUserByEmail(email);

        if (!user || !user.password) throw new CredentialsSignin();

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new CredentialsSignin();

        if (!user.emailVerified) throw new AccountNotLinked();
        
        return user;
      },
    }),
    github,
    google,
  ],
} satisfies NextAuthConfig;
