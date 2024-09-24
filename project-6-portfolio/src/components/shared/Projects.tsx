import { projects } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { CiLocationArrow1 } from "react-icons/ci";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { PinContainer } from "../ui/pin";
import { TextGenerateEffect } from "../ui/text-generate-effect";

function Projects() {
  return (
    <section id="project" className="text-center">
      <TextGenerateEffect
        className="heading text-lg md:text-5xl lg:text-6xl"
        words={"A small section of     recent projects"}
      />
      {/* <GlareCard className="flex flex-col items-center justify-center">
      </GlareCard> */}

      {/* Project cards */}
      <div className="my-48 flex justify-center ">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 md:gap-x-10 xl:gap-x-0 gap-y-60 md:gap-y-80">
          {projects.map((p, i) => (
            <div className="text-start" key={i}>
              <PinContainer
                href={p.link}
                title={p.link}
                className="border-none"
              >
                <Link href={p.link}>
                  <Card className="lg:w-[500px] w-[400px] border-none bg-white dark:bg-black-100">
                    <CardContent className="relative lg:space-y-10 space-y-3 overflow-hidden p-0">
                      <div className="min-h-80 min-w-80">
                        <Image
                          src={p.img}
                          alt={p.title}
                          width={800}
                          height={600}
                        />
                      </div>

                      <div className="space-y-3">
                        <CardTitle className="text-xl md:text-2xl">
                          {p.title}
                        </CardTitle>
                        <CardDescription className="text-base md:text-lg">
                          {p.des}
                        </CardDescription>
                      </div>

                      <div className="flex w-full justify-between">
                        <div className="flex w-full flex-row items-center">
                          <AnimatedTooltip items={p.iconLists} />
                        </div>
                        <p className="flex items-center gap-2 text-purple">
                          <span>Check&nbsp;Live&nbsp;Site</span>

                          <span>
                            <CiLocationArrow1 className="text-2xl" />
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
