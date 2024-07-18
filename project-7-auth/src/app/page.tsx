import { auth } from "@/auth";
import LoginButton from "@/components/auth/login-button";
import LogoutButton from "@/components/auth/logout-button";
import SignupButton from "@/components/auth/signup-button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await auth();
  console.log(user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400 to-purple-100">
      <div className="space-y-6">
        <h1 className="text-6xl text-center font-semibold text-white drop-shadow-md">
          🔐Auth
        </h1>
        <p className="text-center">A simple authentication service</p>
        <div className="flex justify-between gap-2">
          <LoginButton>
            <Button variant={"secondary"}>Login</Button>
          </LoginButton>
          <SignupButton>
            <Button>Sign Up</Button>
          </SignupButton>
          {user && (
            <LogoutButton>
              <Button>Logout</Button>
            </LogoutButton>
          )}
        </div>
      </div>
    </main>
  );
}
