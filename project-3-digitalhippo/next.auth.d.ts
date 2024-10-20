// TODO: TYPE TO BE FIXED
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  token?: JWT;
  isSeller: boolean;
  sellerId: string;
};

declare module "next-auth" {
  interface AdapterUser extends ExtendedUser {
    isSeller: boolean;
    sellerId: string;
  }

  interface Session {
    user: {
      token?: JWT;
      isSeller: boolean;
      sellerId: string;
    } & DefaultSession["user"];
  }
}
