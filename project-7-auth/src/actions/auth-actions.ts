"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { loginSchema, signupSchema } from "@/schemas";
import { getCurrentUser } from "@/utils/db/db.utils";
import { generateVerificationToken } from "@/utils/db/verification-token.utils";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
    return { success: false, message: "Enter right email" };
  }

  const { email, password } = validated.data;

  const existingUser = await getCurrentUser(email);

  if (!existingUser || !existingUser.password) {
    return { success: false, message: "Enter right email" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    return {
      success: true,
      message: "Verification email has been sent, please check your email",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: process.env.NEXT_PUBLIC_SIGN_IN_REDIRECT_URL || "/",
    });

    return { success: true, message: "logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        case "AccountNotLinked":
          return { success: false, message: "Verify your email" };
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
    // const match = await login({
    //   email: validated.data.email,
    //   password: validated.data.password,
    // });

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

  const verificationToken = await generateVerificationToken(createUser.email);

  // TODO: Send verification token email;

  return {
    success: true,
    message: "Verification email has been sent, please check your email",
  };
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
  try {
    const res = await signIn("github", {
      redirect: true,
      redirectTo: process.env.NEXT_PUBLIC_SOCIAL_SIGN_IN_REDIRECT_URL || "/",
    });

    if (!res) {
      return { success: false, message: "Something went wrong" };
    }
    return { success: true, message: "signed up successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "DuplicateConditionalUI":
          return { success: false, message: "User already exists" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const google = async () => {
  try {
    const res = await signIn("google", {
      redirect: true,
      redirectTo: process.env.NEXT_PUBLIC_SOCIAL_SIGN_IN_REDIRECT_URL || "/",
    });
    if (!res) {
      return { success: false, message: "Something went wrong" };
    }
    console.log("not able to sign in with google");

    return { success: true, message: "signed up successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "DuplicateConditionalUI":
          return { success: false, message: "User already exists" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error;
  }
};
