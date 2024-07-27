import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Enter a valid email address." }),
  password: z
    .string({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const signupSchema = z.object({
  // TODO: Check username does it already exist
  name: z
    .string({ message: "Username is required." })
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Enter a valid email address." }),
  password: z
    .string({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
  // TODO: Check password and confirm password match
  confirmPassword: z
    .string({ message: "Confirm password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});
