import Hero from "@/components/shared/Hero";
import { WobbleCard } from "@/components/ui/wobble-card";
import { WobbleCardDemo } from "@/components/ui/WoobbleCardDemo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-center-col relative mx-auto w-full overflow-hidden px-5 sm:px-10">
      <div className="w-full max-w-7xl">
        <Hero />
        <WobbleCardDemo />
      </div>
    </main>
  );
}
