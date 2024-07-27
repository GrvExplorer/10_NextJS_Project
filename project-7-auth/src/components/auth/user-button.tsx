import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FcSettings } from "react-icons/fc";
import { MdLogout } from "react-icons/md";
import LogoutButton from "./logout-button";

async function UserButton() {
  const user = await auth();
  console.log("🚀 ~ file: user-button.tsx:17 ~ UserButton ~ user:", user)

  if (user === undefined || user === null) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* FIXME: Shimmer avatar here */}
        <Avatar className="relative cursor-pointer">
          <AvatarImage className="inline-block bg-gray-300" src={user.user?.image!} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-xl mt-2">
        <DropdownMenuLabel>
          <div className="flex gap-4">
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.user?.image!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium">{user.user?.name}</p>
              <p className="font-normal text-sm text-gray-800">
                {user.user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="py-2 cursor-pointer pl-4 flex gap-8">
          <p className="">
            <FcSettings />
          </p>
          <p className="">Manage Account</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <LogoutButton>
          <DropdownMenuItem className="py-2 cursor-pointer pl-4 flex gap-8">
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
