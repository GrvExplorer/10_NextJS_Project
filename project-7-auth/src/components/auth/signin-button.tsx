"use client";

import { useRouter } from "next/navigation";

interface SignInButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function SignInButton({
  children,
  mode = "redirect",
  asChild,
}: SignInButtonProps) {
  const router = useRouter();

  const onClick = () => {
    if (process.env.NEXT_PUBLIC_SIGN_IN_URL) {
      router.push(process.env.NEXT_PUBLIC_SIGN_IN_URL);
    }

    console.log(
      "🚀 ~ file: login-button.tsx:22 ~ onClick ~ process.env.NEXT_PUBLIC_SIGN_IN_URL:",
      process.env.NEXT_PUBLIC_SIGN_IN_URL
    );

    router.push("/sign-in");
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
