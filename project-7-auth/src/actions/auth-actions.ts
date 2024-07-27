"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { loginSchema, signupSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
    return { success: false, message: "Something went wrong" };
  }

  const { email, password } = validated.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: process.env.NEXT_PUBLIC_SIGN_IN_REDIRECT_URL || "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validated = signupSchema.safeParse(values);
  if (!validated.success) {
    return { success: false, message: "Something went wrong" };
  }

  // FIXME: Generate a good salt

  const getUser = await db.user.findFirst({
    where: {
      email: validated.data.email,
    },
  });

  if (getUser) {
    const match = await login({
      email: validated.data.email,
      password: validated.data.password,
    });

    return {
      success: false,
      message: "User already exists",
    };
  }

  const hashPassword = await bcrypt.hash(validated.data.password, 10);

  // TODO: username adding
  const createUser = await db.user.create({
    data: {
      name: validated.data.name,
      email: validated.data.email,
      password: hashPassword,
    },
  });
  if (!createUser)
    return {
      success: false,
      message: "Something went wrong",
    };

  // TODO: Send verification token email;

  return { success: true, message: "signed up successfully" };
};

export const logout = async () => {
  await signOut({
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URL || "/sign-in",
  });

  return { success: true, message: "logged out successfully" };
};

// login or signup with socials or Oauth
export const github = async () => {
  const res = await signIn("github", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_SOCIAL_SIGN_IN_REDIRECT_URL || "/",
  });
  if (!res) {
    return { success: false, message: "Something went wrong" };
  }

  return { success: true, message: "signed up successfully" };
};

export const google = async () => {
  const res = await signIn("google", {
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_SOCIAL_SIGN_IN_REDIRECT_URL || "/",
  });
  if (!res) {
    return { success: false, message: "Something went wrong" };
  }

  return { success: true, message: "signed up successfully" };
};
