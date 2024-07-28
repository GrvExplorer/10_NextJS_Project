import FormError from "@/components/ui/form-error";
import { currentUserRole } from "@/utils/auth/current-user";

async function RoleGate({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const role = await currentUserRole();
  console.log("🚀 ~ file: role-gate.tsx:6 ~ RoleGate ~ role:", role)


  if (!role) return null;

  if (!allowedRoles.includes(role))
    return <FormError message="Only admins can access this page" />;

  return <>{children}</>;
}

export default RoleGate;
