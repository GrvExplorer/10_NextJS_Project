import { Button } from "@/components/ui/button";
import CheckoutButton from "../payment/checkout-button";

async function PaymentSession() {
  const mode = "modal";

  return (
    <CheckoutButton mode={mode}>
      <Button>Order</Button>
    </CheckoutButton>
  );
}

export default PaymentSession;
