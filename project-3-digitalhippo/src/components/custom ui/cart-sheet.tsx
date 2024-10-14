import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";

function CartSheet({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">{children}</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="mt-0 flex flex-row items-start justify-between">
          <SheetTitle>Cart</SheetTitle>
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <DropdownMenuSeparator className="h-[2px]" />

        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-4">
          <Image
            src={"/hippo-empty-cart.png"}
            width={200}
            height={200}
            alt="empty cart"
          />
          <div className="flex flex-col space-y-1">
            <p className="text-center text-lg font-semibold text-foreground">
              Your cart is empty
            </p>

            <p className="text-sm text-muted-foreground">
              Add items to your cart to checkout.
            </p>
          </div>
        </div>
      </SheetContent>

      <SheetOverlay />
    </Sheet>
  );
}

export default CartSheet;
