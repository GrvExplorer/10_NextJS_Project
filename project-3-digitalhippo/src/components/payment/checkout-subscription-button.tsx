"use client";

import { createSubscriptionOptions } from "@/app/_actions/payment.action";
import { trpc } from "@/trpc";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

export function CheckoutSubscriptionBtn({
  children,
  mode = "modal",
  planId,
}: {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  planId: string;
}) {
  const { pending } = useFormStatus();
  const router = useRouter();

  const onClick = async (e: any) => {
    e.preventDefault();

    try {
      const options = await createSubscriptionOptions(planId);

      if (!options) return;

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on("payment.failed", function (response: any) {
        alert(
          "Oops! " +
            response.error.code +
            " " +
            response.error.description +
            " " +
            response.toString(),
        );
        console.log(response);
      });


      rzp1.on("subscription.activated", async function (response: any) {
        console.log("🚀 ~ file:payment.activated:47 ~ response:", response)

        // trpc.webhooks.activated.mutate({ response });        
      });

      rzp1.on("subscription.authenticated", function (response: any) {
        console.log("Payment Authorized");
        console.log(response);
      });

    } catch (error) {
      console.log(
        "🚀 ~ file: checkout-subscription-button.tsx:103 ~ onClick ~ error:",
        error,
      );
    }
  };

  // FIXME: Redirect mode not working
  // if (mode === "redirect") {
  //   <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
  //     <input type="hidden" name="key_id" value={options.key} />
  //     <input type="hidden" name="name" value={options.name} />
  //     <input
  //       type="hidden"
  //       name="subscription_id"
  //       value={options.subscription_id}
  //     />
  //     <input type="hidden" name="description" value={options.description} />
  //     <input type="hidden" name="prefill[name]" value={options.prefill.name} />
  //     <input
  //       type="hidden"
  //       name="prefill[contact]"
  //       value={options.prefill.contact}
  //     />
  //     <input
  //       type="hidden"
  //       name="prefill[email]"
  //       value={options.prefill.email}
  //     />
  //     <input
  //       type="hidden"
  //       name="callback_url"
  //       value="https://localhost:3000/payment-success"
  //     />
  //     <input
  //       type="hidden"
  //       name="cancel_url"
  //       value="https://example.com/payment-cancel"
  //     />
  //     <span>{children}</span>
  //   </form>;
  //   return;
  // }

  return (
    <span onClick={(e) => onClick(e)} className="cursor-pointe">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>{children}</>
      )}
    </span>
  );
}
