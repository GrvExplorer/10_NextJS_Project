import Image from "next/image";

function Topbar() {
  return (
    <div className="">
      <div className="py-4 px-6">
        <div className="flex  items-center gap-2  font-bold">
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          Threads
        </div>
      </div>
    </div>
  );
}

export default Topbar;
