// TODO: TYPE TO BE FIXED
import { AdapterUser, DefaultSession } from "next-auth";

export interface ExtendedUser extends AdapterUser {
  isSeller: boolean;
  sellerId: string;
};

declare module "next-auth" {
  interface AdapterUser extends ExtendedUser  {} 

  interface Session {
    user: {
      isSeller: boolean;
      sellerId: string;
    } & DefaultSession["user"];
  }
}
