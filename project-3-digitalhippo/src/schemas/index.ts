import { z } from "zod";

// Auth
export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Enter a valid email address." }),
  password: z
    .string({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const loginWithResendSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Enter a valid email address." }),
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

// become seller
export const becomeSellerSchema = z.object({
  userId: z.string(),
  name: z.string(),
  address: z.string(),
  phoneNo: z.string()
  // .min(10, { message: "Phone number must be at least 10 digits." }).max(10, {message: 'Phone number must be at most 10 digits.'})
  ,
  email: z.string().email({message: 'Enter a valid email address.'}),
  description: z.string()
  .max(500, {message: 'Description must be at most 500 characters.'}),
  logo: z.string().optional(),
  banner: z.string().optional(),
});
