"use client";

import { useRouter } from "next/navigation";

interface SignUpButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function SignUpButton({
  children,
  mode = "redirect",
  asChild,
}: SignUpButtonProps) {
  const router = useRouter();

  const onClick = () => {
    if (process.env.NEXT_PUBLIC_SIGN_UP_URL) {
      router.push(process.env.NEXT_PUBLIC_SIGN_UP_URL);
    }
    router.push("/sign-up");
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
