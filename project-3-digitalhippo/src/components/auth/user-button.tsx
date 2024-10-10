"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/auth.hooks";
import { notFound } from "next/navigation";
import { useState } from "react";
import { FcSettings } from "react-icons/fc";
import { MdLogout } from "react-icons/md";
import UserAvatar from "../custom ui/user-avatar";
import LogoutButton from "./logout-button";
import ManageAccountButton from "./manage-account-button";

interface UserButtonProps {
  mode?: "redirect" | "modal";
}

function UserButton({ mode = "redirect" }: UserButtonProps) {
  const user = useCurrentUser();

  const [openDropdown, setOpenDropdown] = useState(false);
  if (user === undefined) return notFound();

  // utils functions
  // console.log(generateBackground(user?.name!));

  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={() => {
        setOpenDropdown(!openDropdown);
      }}
    >
      <DropdownMenuTrigger asChild>
        {/* FIXME: Shimmer avatar here */}
        <div className="">
          {/* {user.name && user.image && user.email && ( */}
            <UserAvatar userImage={user.image} userName={user.name} userEmail={user.email} />
          {/* )} */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 w-80 rounded-xl">
        <DropdownMenuLabel>
          <div className="flex gap-4">
            {/* {user.name && user.image && user.email && ( */}
              <UserAvatar userImage={user.image} userName={user.name} userEmail={user.email} />
            {/* )} */}

            <div className="flex flex-col">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm font-normal text-gray-800">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* FIXME: open of Manage account should close dropdown */}

        <ManageAccountButton mode={mode} className="w-full">
          <div
            // onClick={() => {
            //   setOpenDropdown(!openDropdown);
            // }}
            className="flex cursor-pointer items-center gap-8 rounded-md px-4 py-2 outline-none transition-colors hover:bg-accent"
          >
            <p className="">
              <FcSettings />
            </p>
            <p className="">Manage Account</p>
          </div>
        </ManageAccountButton>

        <DropdownMenuSeparator />

        <LogoutButton>
          <DropdownMenuItem className="flex cursor-pointer gap-8 px-4 py-2">
            <p className="">
              <MdLogout />
            </p>
            <p className="">Logout</p>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
