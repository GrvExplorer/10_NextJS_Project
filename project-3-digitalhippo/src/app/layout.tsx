import { auth } from "@/auth";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/lib/redux";
import { TRPCProvider } from "@/trpc/client";
import { constructMetadata } from "@/utils/utils";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./_theme/index.css";
import "./globals.css";

const robot = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900", "500", "300", "100"],
  variable: "--font-roboto",
});

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  return (
    <html lang="en">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <body className={robot.className}>
        <Toaster />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <ReduxProvider>
              <SessionProvider session={user}>
                <div className="grid h-screen grid-rows-[auto_1fr_auto]">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </SessionProvider>
            </ReduxProvider>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
