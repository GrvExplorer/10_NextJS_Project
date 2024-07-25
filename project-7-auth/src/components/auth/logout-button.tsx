"use client";

import { logout } from "@/actions/auth-actions";

interface SignUpButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LogoutButton({
  children,
  mode = "redirect",
  asChild,
}: SignUpButtonProps) {
  const onClick = async () => {
    await logout();
  };

  if (mode === "modal") {
    return <span>TODO: Implement Model</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
