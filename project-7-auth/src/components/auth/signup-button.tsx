"use client";

import { useRouter } from "next/navigation";

interface SignupButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function SignupButton({
  children,
  mode = "redirect",
  asChild,
}: SignupButtonProps) {
  const router = useRouter();

  const onClick = () => {
    console.log("SIGNIN BUTTON CLICKED");
    router.push("/auth/sign-up");
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
