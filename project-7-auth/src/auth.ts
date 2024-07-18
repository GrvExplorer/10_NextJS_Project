import NextAuth from "next-auth"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [github, google],
})