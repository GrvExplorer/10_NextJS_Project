import About from "@/components/shared/About";
import Hero from "@/components/shared/Hero";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { WobbleCardDemo } from "@/components/ui/WoobbleCardDemo";
import { gridItems } from "@/constants";

export default function Home() {
  return (
    <main className="flex-center-col relative mx-auto w-full overflow-hidden px-5 sm:px-10">
      <div className="w-full max-w-7xl">
        <Hero />
        {/* <WobbleCardDemo /> */}
        <About />
      </div>
    </main>
  );
}
