import BecomeSellerForm from "@/components/shared/BecomeSellerForm";
import { Card } from "@/components/ui/card";

function page() {
  return (
    <Card className="px-4 py-2 mx-6 lg:mx-10 my-8 lg:my-12">
      <BecomeSellerForm />
    </Card>
  );
}

export default page;
