"use client";

import { logout } from "@/actions/auth-actions";
import { redirect, useRouter } from "next/navigation";

interface SignupButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LogoutButton({
  children,
  mode = "redirect",
  asChild,
}: SignupButtonProps) {
  const router = useRouter();

  const onClick = async () => {
    await logout()
    console.log("LOGOUT BUTTON CLICKED");
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
