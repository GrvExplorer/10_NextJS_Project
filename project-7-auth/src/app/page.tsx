import SignedOut from "@/components/auth/signed-out";
import SignInButton from "@/components/auth/signin-button";
import SignUpButton from "@/components/auth/signup-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col gap-8 justify-center items-center h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400 to-purple-100">
      <Link href={"/dashboard"}>
        <h1 className="text-4xl font-bold bg-[linear-gradient(110deg,#000103,45%,#713a8f,55%,#000103)] bg-[length:200%_100%] px-4 py-2 hover:animate-shimmer cursor-pointer text-purple-300 rounded-lg">
          Welcome to 🔐Auth JS
        </h1>
      </Link>
      <div className="flex justify-between gap-6">
        <SignedOut>
          <SignInButton>
            <Button variant={"secondary"}>Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </main>
  );
}
