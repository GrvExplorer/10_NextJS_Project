import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/ui/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={bricolage.className}>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />

          <Navbar />

          {children}

          <MaxWidthWrapper className={"border-t border-gray-200 "}>
            <footer className="flex flex-col items-center justify-end gap-6 py-8 ">
              <p className="">2024 All right reserved</p>
              <p className="flex gap-8">
                <p>Terms</p>
                <p>Privacy Policy</p>
                <p>Cookies Policy</p>
              </p>
            </footer>
          </MaxWidthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
