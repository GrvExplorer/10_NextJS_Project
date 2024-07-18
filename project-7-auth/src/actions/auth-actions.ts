"use server";

import { signIn, signOut } from "@/auth";
import { loginSchema, signupSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
    console.log("error ");
    return { success: false, message: "Something went wrong" };
  }
  console.log("logged in successfully");

  return { success: true, message: "logged in successfully" };
};

export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validated = signupSchema.safeParse(values);
  if (!validated.success) {
    console.log("error ");
    return { success: false, message: "Something went wrong" };
  }
  console.log("signed up successfully");

  return { success: true, message: "signed up successfully" };
};

export const logout = async () => {
  await signOut({
    redirect: true,
    redirectTo: process.env.REDIRECT_URL_LOGOUT,
  });
  console.log("logged out successfully");
  return { success: true, message: "logged out successfully" };
};

// login or signup with socials or Oauth
export const github = async () => {
  const res = await signIn("github", {
    redirect: true,
    redirectTo: process.env.REDIRECT_URL_SIGN,
  });
  console.log(res);
  if (!res) {
    console.log("error");
    return { success: false, message: "Something went wrong" };
  }

  console.log("signed up successfully");
  return { success: true, message: "signed up successfully" };
};
export const google = async () => {
  const res = await signIn("google", {
    redirect: true,
    redirectTo: process.env.REDIRECT_URL_SIGN,
  });
  console.log(res);
  if (!res) {
    console.log("error");
    return { success: false, message: "Something went wrong" };
  }

  console.log("signed up successfully");
  return { success: true, message: "signed up successfully" };
};
