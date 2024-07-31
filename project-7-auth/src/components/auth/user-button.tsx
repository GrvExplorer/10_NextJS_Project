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
import ManageAccount from "./manage-account-button";

function UserButton() {
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
        <div>
          {user.name && (
            <UserAvatar userImage={user.image} userName={user.name} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-xl mt-2">
        <DropdownMenuLabel>
          <div className="flex gap-4">
            {user.name && (
              <UserAvatar userImage={user.image} userName={user.name} />
            )}

            <div className="flex flex-col">
              <p className="font-medium">{user?.name}</p>
              <p className="font-normal text-sm text-gray-800">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* FIXME: open of Manage account should close dropdown */}

        <ManageAccount className="w-full">
          <div
            // onClick={() => {
            //   setOpenDropdown(!openDropdown);
            // }}
            className="py-2 outline-none transition-colors hover:bg-accent rounded-md px-4 items-center cursor-pointer flex gap-8"
          >
            <p className="">
              <FcSettings />
            </p>
            <p className="">Manage Account</p>
          </div>
        </ManageAccount>

        <DropdownMenuSeparator />

        <LogoutButton>
          <DropdownMenuItem className="py-2 px-4 cursor-pointer  flex gap-8">
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
