import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="h-screen flex items-center justify-center">
      {children}
    </section>
  );
}