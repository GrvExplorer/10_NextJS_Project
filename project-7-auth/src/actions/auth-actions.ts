"use server";

import { signIn, signOut } from "@/auth";
import sendVerificationTokenEmail from "@/components/auth/verification-token-email";
import { db } from "@/db";
import { loginSchema, signupSchema } from "@/schemas";
import { getCurrentUserByEmail } from "@/utils/db/db.utils";
import { generateVerificationToken, getVerificationTokenByToken } from "@/utils/db/verification-token.utils";
import { user, verificationToken } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { Resend } from "resend";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
    return { success: false, message: "Enter right email" };
  }

  const { email, password } = validated.data;

  const existingUser = await getCurrentUserByEmail(email);

  if (!existingUser || !existingUser.password) {
    return { success: false, message: "Enter right email" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    const sendEmail = await sendVerificationEmail(
      email,
      existingUser,
      verificationToken
    );

    if (!sendEmail.success) {
      return {
        success: false,
        message: "Something went wrong, please try again",
      };
    }
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
    const match = await login({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (match.success) {
      return {
        success: true,
        message: "Logged in successfully Verify you email",
      };
    }

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

  if (!verificationToken) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }

  const sendedEmail = await sendVerificationEmail(
    createUser.email,
    createUser,
    verificationToken
  );

  if (!sendedEmail.success) {
    return {
      success: false,
      message: "Something went wrong please try again",
    };
  }

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

export const sendVerificationEmail = async (
  email: string,
  user: user,
  verification: verificationToken
) => {
  const resend = new Resend(process.env.EMAIL_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Auth JS <onboarding@resend.dev>",
    to: ["icodelife307@gmail.com"],
    subject: "Verify your email",
    react: sendVerificationTokenEmail({
      userName: user.name,
      token: verification.token,
      userId: user.id,
      validityDate: verification.expires,
    }),
  });

  if (error) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    data: data,
  };
};

export const verifyEmail = async (token: string) => {
  const verification = await getVerificationTokenByToken(token);

  if (!verification) {
    return {
      success: false,
      message: "Invalid token",
    };
  }

  const hasExpired = new Date(verification.expires) < new Date()

  if (hasExpired) {
    return {
      success: false,
      message: "Token expired",
    };
  }

  const user = await getCurrentUserByEmail(verification.email);
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  if (user.emailVerified) {
    return {
      success: false,
      message: "Email already verified",
    };
  }
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      // doing this for so that can be used to update the email if user already loggedIn and Email will also get's updated during the process of verification.
      email: user.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: verification.id,
    },
  })

  return {
    success: true,
    message: "Email verified successfully",
  };
};
