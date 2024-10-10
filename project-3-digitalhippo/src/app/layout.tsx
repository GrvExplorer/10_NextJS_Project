import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/lib/redux";
import { TRPCProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./_theme/index.css";
import "./globals.css";

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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <body className={inter.className}>
        <Toaster />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
