import LogoutButton from "@/components/auth/logout-button";
import RoleGate from "@/components/auth/role-gate";
import SignedIn from "@/components/auth/signed-in";

import UserButton from "@/components/auth/user-button";
import { Income } from "@/components/shared/Income";
import { Button } from "@/components/ui/button";
import { currentUserRole } from "@/utils/auth/current-user";

async function Dashboard() {
  const role = await currentUserRole();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400 to-purple-100">
      <div className="space-y-6">
        <h1 className="text-6xl text-center font-semibold text-white drop-shadow-md">
          🔐Auth
        </h1>
        <p className="text-center">A simple authentication service</p>
        <div className="flex justify-between gap-2">
          <SignedIn>
            <UserButton />
            <LogoutButton>
              <Button className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Logout
              </Button>
            </LogoutButton>
          </SignedIn>
        </div>

        <div>
          <p className="text-center mb-2">
            👋 Welcome, <span className="font-semibold">{role}</span>
          </p>

          <RoleGate allowedRoles={["ADMIN"]}>
            <p className="text-center mb-2 font-bold text-white underline">
              Charts
            </p>
            <Income />
          </RoleGate>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
