import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { gridItems } from "@/constants";

function About() {
  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => 
        {
          console.log(item);
          
          return(
          <BentoGridItem
            key={i}
            id={item.id}
            title={item.title}
            description={item.description}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
            className={item.className}
          />
        )})}
      </BentoGrid>
    </section>
  );
}

export default About;
