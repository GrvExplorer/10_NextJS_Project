
// TODO: TYPE TO BE FIXED
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRoles;
  id: string;
};

declare module "next-auth" {

  interface AdapterUser extends ExtendedUser {}

  interface Session {
    user: {
      id: string;
      role: UserRoles;
    } & DefaultSession["user"];
  }
}
