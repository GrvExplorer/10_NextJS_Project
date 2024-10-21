import BecomeSellerForm from "@/app/seller-dashboard/_components/seller-form";
import { Card } from "@/components/ui/card";

function page() {
  return (
    <div className="mx-6 my-8 lg:mx-10 lg:my-12">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight">
        Become a Seller
      </h1>
      <Card className="px-4 py-2">
        <BecomeSellerForm mode="become" />
      </Card>
    </div>
  );
}

export default page;
