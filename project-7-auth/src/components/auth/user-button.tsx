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
import { currentUser } from "@/utils/auth/current-user";

async function UserButton() {
  const user = await currentUser();

  if (!user) return null;

  // utils functions
  function getInitials(name: string) {
    return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  }

  // TODO: should work -> generate random color ( https://medium.com/@femiakt/generate-avatar-or-profile-picture-with-username-initials-lettered-avatar-with-react-eae5d2de5ac8#4761)
  function generateBackground(name: string) {
    let hash = 0;
    let i;

    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  // console.log(generateBackground(user?.name!));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* FIXME: Shimmer avatar here */}
        <Avatar className="relative cursor-pointer">
          <AvatarImage
            className="inline-block bg-gray-300"
            src={user?.image!}
          />
          <AvatarFallback>{getInitials(user?.name!)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-xl mt-2">
        <DropdownMenuLabel>
          <div className="flex gap-4">
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.image!} />
              <AvatarFallback
                className={`bg-[${generateBackground(user?.name!)}]`}
              >
                {getInitials(user?.name!)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium">{user?.name}</p>
              <p className="font-normal text-sm text-gray-800">{user?.email}</p>
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
