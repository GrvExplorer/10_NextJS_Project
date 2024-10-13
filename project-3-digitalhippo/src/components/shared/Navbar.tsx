"use client";
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import SignInButton from "../auth/signin-button";
import CartSheet from "../custom ui/cart-sheet";

function Navbar() {
  const noOfCartItems = 0;

  return (
    <header className="mx-auto max-w-6xl rounded-lg bg-base-100 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
        <p className="flex items-center gap-8">
          <Link href={"/"}>
            <Image src="/favicon.ico" width={40} height={40} alt="Logo" />
          </Link>
          <div className="flex items-center gap-1">
            UI Kits
            <FaAngleDown className="" />
          </div>

          <p className="flex items-center gap-1">
            Icons
            <FaAngleDown className="" />
          </p>
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <SignInButton>Sign In</SignInButton>
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
