import CheckoutButton from "@/components/payment/checkout-button-pre";
import { Button } from "@/components/ui/button";

async function PaymentSession() {
  const mode = "modal";

  return (
    <CheckoutButton mode={mode}>
      <Button>Pay Now</Button>
    </CheckoutButton>
  );
}

export default PaymentSession;
