"use client";

import animationData from "@/data/confetti.json";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "react-lottie";
import { BackgroundGradientAnimation } from "./background-gradient";
import GridGlobe from "./grid-globe";
import MagicBtn from "./MagicBtn";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "md:grid-row-7 mx-auto grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-5 lg:gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: String;
  id: Number;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const thirdLeftSide = ["React JS", "Typescript", "Next JS", "Shadcn UI"];
  const thirdRightSide = ["Node JS", "", "Express JS", "Mongodb"];

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handelCopy = async () => {
    // BUG: text is not being copied and function is not running.
    const text = "grvexplorer@outlook.com";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    console.log(`copied: ${copied}`);
  };

  return (
    <div
      className={cn(
        "group/bento relative row-span-1 text-white flex flex-col justify-between overflow-hidden rounded-3xl border border-transparent bg-white shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.1] dark:bg-black dark:shadow-none",
        className,
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className="absolute h-full w-full">
        {img && (
          <Image
            src={img}
            alt={img}
            fill
            className={cn(imgClassName, "object-cover object-center")}
          />
        )}
      </div>

      <div
        className={`absolute -bottom-2 right-0 ${id === 5 && "w-full opacity-80"} `}
      >
        {spareImg && (
          <img
            src={spareImg}
            alt={spareImg}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>

      {id === 6 && (
        <BackgroundGradientAnimation>
          <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl"></div>
        </BackgroundGradientAnimation>
      )}

      <div className="h-full transition duration-200 group-hover/bento:translate-x-2">
        {/* Heading */}
        <div
          className={cn(
            "relative flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-10",
            titleClassName,
          )}
        >
          {/* description */}
          <div className="z-10 font-sans text-sm font-extralight text-[#C1C2D3] md:max-w-32 md:text-xs lg:text-base">
            {description}
          </div>

          {/* title */}
          <div
            className={`z-10 max-w-96 font-sans text-lg font-bold lg:text-3xl`}
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="absolute -right-2 top-0">
              <div className="flex gap-4">
                <div className="relative flex flex-col gap-4 md:-top-6">
                  {thirdLeftSide.map((v, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-[#10132E] px-3 py-2 text-center text-xs opacity-50 lg:px-4 lg:py-4 lg:text-base lg:opacity-100"
                    >
                      {v}
                    </span>
                  ))}
                </div>

                <div className="relative flex flex-col gap-4 lg:-bottom-12">
                  {thirdRightSide.map((v, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-[#10132E] px-3 py-2 text-center text-xs opacity-50 lg:px-6 lg:py-6 lg:text-base lg:opacity-100"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="relative mt-20">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>
              <MagicBtn
                icon={<IoCopyOutline />}
                title={copied ? "Email is Copied!" : "Copy my email address"}
                position="left"
                handleClick={handelCopy}
                otherClasses="gap-4"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
