"use client";

import { createOrderOptions } from "@/app/_actions/payment.action";

declare global {
  interface Window {
    Razorpay: any; // or the type of Razorpay if you have it
  }
}

function CheckoutButton({ children, mode = "modal" }: any) {
  const onClick = async () => {
    const options = await createOrderOptions();

    if (!options) return;

    if (mode === "modal") {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on("payment.captured", async (response) => {
        console.log(
          "🚀 ~ file: checkout-button.tsx:22 ~ rzp1.on ~ response:",
          response,
        );
      });
    }
  };

  // FIXME: Redirect mode not working
  // if (mode === "redirect") {
  //   return (
  //     <form
  //       method="POST"
  //       action="https://api.razorpay.com/v1/checkout/embedded"
  //     >
  //       <input type="hidden" name="key_id" value={options.key} />
  //       <input type="hidden" name="amount" value={options.amount} />
  //       <input type="hidden" name="order_id" value={options.order_id} />
  //       <input type="hidden" name="name" value={options.name} />
  //       <input type="hidden" name="description" value={options.description} />
  //       <input type="hidden" name="image" value={options.image} />
  //       <input
  //         type="hidden"
  //         name="prefill[name]"
  //         value={options.prefill.name}
  //       />
  //       <input
  //         type="hidden"
  //         name="prefill[contact]"
  //         value={options.prefill.contact}
  //       />
  //       <input
  //         type="hidden"
  //         name="prefill[email]"
  //         value={options.prefill.email}
  //       />
  //       <input
  //         type="hidden"
  //         name="notes[shipping address]"
  //         value={options.notes.address}
  //       />
  //       <input
  //         type="hidden"
  //         name="callback_url"
  //         value="https://example.com/payment-callback"
  //       />
  //       <input
  //         type="hidden"
  //         name="cancel_url"
  //         value="https://example.com/payment-cancel"
  //       />
  //       <span>{children}</span>
  //     </form>
  //   );
  // }

  return <span onClick={onClick}>{children}</span>;
}

export default CheckoutButton;
