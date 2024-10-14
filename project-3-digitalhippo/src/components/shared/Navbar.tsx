import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import SignedIn from "../auth/signed-in";
import SignedOut from "../auth/signed-out";
import SignInButton from "../auth/signin-button";
import CartSheet from "../custom ui/cart-sheet";
import UserButton from "../custom ui/user-button";

function Navbar() {
  const noOfCartItems = 0;

  return (
    <header className="mx-auto max-w-6xl w-full rounded-lg bg-base-100 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href={"/"}>
            <Image src="/favicon.ico" width={40} height={40} alt="Logo" />
          </Link>
          <p className="flex items-center gap-1">
            UI Kits
            <FaAngleDown className="" />
          </p>

          <p className="flex items-center gap-1">
            Icons
            <FaAngleDown className="" />
          </p>
        </div>
        <ul className="flex items-center gap-6">
          <li>
            <SignedOut>
              <SignInButton>Sign In</SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
          <CartSheet>
            <li className="flex flex-row-reverse items-center justify-center gap-1">
              <p className="">{noOfCartItems}</p>
              <span className="">
                <CiShoppingCart className="h-6 w-6" />
              </span>
            </li>
          </CartSheet>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
