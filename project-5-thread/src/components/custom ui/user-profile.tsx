"use client";
import { IUser } from "@/db/models/user.model";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";

function UserProfile({ user }: { user: IUser | undefined }) {
  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-6 items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image} />
            <AvatarFallback>
              <Image
                src="/assets/profile.svg"
                alt="profile_icon"
                width={24}
                height={24}
                className="object-contain"
              />
            </AvatarFallback>
          </Avatar>

          <div className="">
            <h1 className="text-heading4-medium text-light-1">{user?.name}</h1>
            <p className="text-base-regular text-light-3">@{user?.username}</p>
          </div>
        </div>

        <Link href="/profile/edit">
          <Button className="flex items-center gap-2">
            <Image
              src={"/assets/edit.svg"}
              alt="edit_icon"
              width={16}
              height={16}
            />
            Edit
          </Button>
        </Link>
      </div>

      <p className="mt-6 text-base-regular text-light-2">{user?.bio}</p>

      <DropdownMenuSeparator className="w-full mt-6" />
    </div>
  );
}

export default UserProfile;
