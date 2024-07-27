import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { db } from "./db";
import { loginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) {
          return { success: false, message: "Something went wrong" };
        }

        const { email, password } = validated.data;

        // TODO: Create Utils for this type of functions
        const user = await db.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!user || !user.password) return null;

        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        return user;
      },
    }),
    github,
    google,
  ],
} satisfies NextAuthConfig;
