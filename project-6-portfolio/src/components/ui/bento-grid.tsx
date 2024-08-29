import { cn } from "@/lib/utils";
import Image from "next/image";

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
}) => (
  // log all the props

  <div
    className={cn(
      "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-3xl border border-transparent bg-white shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.1] dark:bg-black dark:shadow-none",
      className,
      // {
      //   "md:col-span-6 lg:col-span-3 lg:row-span-2": id === 1,
      // },
      // {
      //   "md:col-span-3 lg:col-span-2 lg:row-span-1": id === 2,
      // },
      // {
      //   "md:col-span-3 lg:col-span-2": id === 3,
      // },
      // {
      //   "md:col-span-3 lg:col-span-2": id === 4,
      // },
      // {
      //   "md:col-span-3 md:row-span-2": id === 5,
      // },
      // {
      //   "md:col-span-3 lg:col-span-2": id === 6,
      // },
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
        className={`absolute -bottom-5 right-0 ${id === 4 && "w-full opacity-80"} `}
      >
        {spareImg && (
          <Image
            src={spareImg}
            alt={spareImg}
            fill
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>

    <div className="transition duration-200 group-hover/bento:translate-x-2">
      {/* Heading */}
      <div
        className={cn(
          titleClassName,
          "relative flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 lg:p-10",
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
      </div>

      {/* image */}
      {/* {id === 1 && (
        <div className="absolute h-full w-full">
          {img && (
            <Image
              src={img}
              className={cn("object-cover object-center", imgClassName)}
              fill
              alt={"img"}
            />
          )}
        </div>
      )} */}
    </div>
  </div>
);
