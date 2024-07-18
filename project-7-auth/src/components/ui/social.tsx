"use client";

import { github, google } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function Social() {
  return (
    <div className="flex justify-center items-center flex-col w-full gap-y-4">
      <div className="flex items-center justify-center w-full gap-x-2">
        <div className="h-[1.2px] bg-gray-100 w-2/4 " />
        <span className="text-sm font-light">or</span>
        <div className="h-[1.2px] bg-gray-100 w-2/4 " />
      </div>
      <div className="flex items-center w-full gap-x-2">
        <Button
          size={"lg"}
          className="w-full"
          variant={"outline"}
          onClick={async () => {
            await google();
          }}
        >
          <FcGoogle className="text-2xl" />
        </Button>
        <Button
          size={"lg"}
          className="w-full"
          variant={"outline"}
          onClick={async () => {
            await github();
          }}
        >
          <FaGithub className="text-2xl" />
        </Button>

        {/* TODO: Be be implemented this https://authjs.dev/guides/pages/signin */}

      </div>
    </div>
  );
}
