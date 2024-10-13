import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/lib/redux";
import { TRPCProvider } from "@/trpc/client";
import { constructMetadata } from "@/utils/utils";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              <Navbar />
              {children}
            </ReduxProvider>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
