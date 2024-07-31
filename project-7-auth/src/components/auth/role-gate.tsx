import FormError from "@/components/custom ui/form-error";
import { currentUserRole } from "@/utils/auth/current-user";

async function RoleGate({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const role = await currentUserRole();

  if (!role) return null;

  if (!allowedRoles.includes(role))
    return <FormError message="Only admins can access this Component" />;

  return <>{children}</>;
}

export default RoleGate;
