// TODO: TYPE TO BE FIXED
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  token?: JWT;
  seller: boolean;
};

declare module "next-auth" {
  interface AdapterUser extends ExtendedUser {
    seller: boolean;
  }

  interface Session {
    user: {
      token?: JWT;
      seller: boolean
    } & DefaultSession["user"];
  }
}
