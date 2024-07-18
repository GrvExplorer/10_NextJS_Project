import LeftSideBar from "@/components/shared/root/LeftSideBar";
import RightSideBar from "@/components/shared/root/RightSideBar";
import Topbar from "@/components/shared/root/Topbar";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Thread",
  description: "We connects family and friends together.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="grid h-screen gird">
        <Topbar />
        <LeftSideBar />
        <RightSideBar />
        {children}
      </div>
    </section>
  );
}
