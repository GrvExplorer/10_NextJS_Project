import About from "@/components/shared/About";
import Brands from "@/components/shared/Brands";
import Hero from "@/components/shared/Hero";
import Projects from "@/components/shared/Projects";
import Testimonial from "@/components/shared/Testimonial";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { WobbleCardDemo } from "@/components/ui/WoobbleCardDemo";
import { gridItems } from "@/constants";

export default function Home() {
  return (
    <main className="flex-center-col relative mx-auto w-full bg-white dark:bg-black-100 overflow-hidden px-5 sm:px-10">
      <div className="w-full max-w-7xl">
        <Hero />
        <About />
        <Projects />
        <Testimonial />
        <Brands />

        
      </div>
    </main>
  );
}
