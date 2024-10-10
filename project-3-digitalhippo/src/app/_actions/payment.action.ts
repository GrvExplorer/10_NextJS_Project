"use server";

import { trpc } from "@/trpc";
import { currentUser } from "@/utils/auth.util";
import Razorpay from "razorpay";

export async function createOrderOptions() {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You need to be logged in");
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay key not found");
    }

    const inst = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const createdOrder = await inst.orders.create({
      amount: "1000",
      currency: "INR",
    });

    if (!createdOrder) {
      throw new Error("Something went wrong while creating the order");
    }

    const checkoutOptions = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: 1000,
      currency: "INR",
      name: "ICODELIFE",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: createdOrder.id,
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        "use server";
        console.log("🚀 ~ file: payment.action.ts:41 ~ response:", response);
        try {
          const res = await trpc.webhooks.captured.mutate({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          console.log(res.success);
        } catch (error) {
          console.log(
            "🚀 ~ file: payment.action.ts:55 ~ createOrderOptions ~ error:",
            error,
          );
        }
      },
      prefill: {
        name: "Jenny Rosen",
        email: "Qf5x2@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    return checkoutOptions;
  } catch (error) {
    console.log(
      "🚀 ~ file: payment.action.ts:38 ~ paymentSession ~ error:",
      error,
    );
  }
}

// ** For order existing on Razorpay
// if (process.env.NODE_ENV !== "production") {
//   if (existsOrder) {
//     const orderOnRazorpay = await inst.orders.fetch(order.id);
//     if (!orderOnRazorpay) {
//       throw new Error("Something went wrong while fetching the order");
//     }
//     return { createdOrder: orderOnRazorpay };
//   }
// }

export async function getAllPlans() {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay key and secret not found");
    }

    const inst = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const plans = inst.plans.all();

    if (!plans) {
      throw new Error("Something went wrong while fetching the plans");
    }

    return { plans };
  } catch (error) {
    console.log(
      "🚀 ~ file: payment.action.ts:55 ~ getAllPlans ~ error:",
      error,
    );
  }
}

export async function createSubscriptionOptions(planId: string) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay key and secret not found");
    }

    const inst = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const createdSubscription = await inst.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      quantity: 1,
      total_count: 12,
      addons: [
        {
          item: {
            name: "Delivery charges",
            amount: 30000,
            currency: "INR",
          },
        },
      ],
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });

    if (!createdSubscription) {
      throw new Error("Something went wrong while creating the subscription");
    }

    const subscriptionOptions = {
      key: process.env.RAZORPAY_KEY_ID,
      name: "Acme Corp.",
      subscription_id: createdSubscription.id,
      description: "Monthly Test Plan",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "8818818806",
      },
      notes: {
        note_key_1: "Tea. Earl Grey. Hot",
        note_key_2: "Make it so.",
      },
    };

    return subscriptionOptions;
  } catch (error) {
    console.log(
      "🚀 ~ file: payment.action.ts:114 ~ createSubscription ~ error:",
      error,
    );
  }
}
