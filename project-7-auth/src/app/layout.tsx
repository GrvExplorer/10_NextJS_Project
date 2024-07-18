import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// const robot = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "700", "900", "500"],
//   variable: "--font-roboto",
// });

export const metadata: Metadata = {
  title: "Auth JS",
  description: "System for authentication in NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster />
        
        {children}</body>
    </html>
  );
}
