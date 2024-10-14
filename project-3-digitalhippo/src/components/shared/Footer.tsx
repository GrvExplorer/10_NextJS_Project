"use client";
import { useSession } from "next-auth/react";

function Footer() {
  const user = useSession();
  console.log("🚀 ~ file: Footer.tsx:8 ~ Footer ~ user:", user);

  return (
    <footer className="mx-auto w-full max-w-6xl bg-base-200 shadow-md">
      <div className="flex h-full w-full flex-col items-center justify-center border-t border-gray-200 p-4 text-center text-sm font-bold tracking-wider text-gray-500">
        <p className="cursor-pointer text-4xl hover:text-blue-600 hover:underline hover:underline-offset-auto">
          Become Seller
        </p>
      </div>
    </footer>
  );
}

export default Footer;
