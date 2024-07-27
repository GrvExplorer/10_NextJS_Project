import LogoutButton from "@/components/auth/logout-button";
import SignedIn from "@/components/auth/signed-in";
import SignedOut from "@/components/auth/signed-out";
import SignInButton from "@/components/auth/signin-button";
import SignUpButton from "@/components/auth/signup-button";
import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400 to-purple-100">
      <div className="space-y-6">
        <h1 className="text-6xl text-center font-semibold text-white drop-shadow-md">
          🔐Auth
        </h1>
        <p className="text-center">A simple authentication service</p>
        <div className="flex justify-between gap-2">
          <SignedOut>
            <SignInButton>
              <Button variant={"secondary"}>Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
            <LogoutButton>
              <Button className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">Logout</Button>
            </LogoutButton>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}
