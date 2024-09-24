import { companies } from "@/constants";
import Image from "next/image";

function Brands() {
  return (
    <>
      <ul className="flex w-full flex-wrap items-center justify-center gap-8 md:gap-14 my-20">
        {companies.map((comp) => (
          <li key={comp.id} className="flex items-center justify-center gap-2">
            <Image
              src={comp.img}
              alt={comp.name}
              width={20}
              height={20}
              className="h-10 w-10"
            />
            <p className="text-xl">{comp.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Brands;
