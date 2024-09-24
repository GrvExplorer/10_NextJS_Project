import { testimonials } from "@/constants";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { TextGenerateEffect } from "../ui/text-generate-effect";

function Testimonial() {
  return (
    <div>
      <TextGenerateEffect
        className="heading text-lg md:text-5xl lg:text-6xl"
        words={"Kind words from     satisfied clients"}
      />

      <div className="relative flex flex-col mt-10 items-center justify-center overflow-hidden rounded-md ">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className=""
        />
      </div>
    </div>
  );
}

export default Testimonial;
