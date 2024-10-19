import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { z } from "zod";

export const webhookRouter = createTRPCRouter({
  captured: publicProcedure
    .input(
      z.object({
        razorpay_payment_id: z.string(),
        razorpay_order_id: z.string(),
        razorpay_signature: z.string(),
      }),
    )
    .output(z.object({ success: z.boolean() }))
    .mutation(async (opts) => {
      const { input } = opts;

      return { success: true };

      // const generate_signature = crypto
      //   .createHash("sha256", process.env.RAZORPAY_KEY_SECRET!)
      //   .update(
      //     `${input.razorpay_order_id}|${input.razorpay_payment_id}`,
      //     "utf-8",
      //   )
      //   .digest("hex");

      // if (generate_signature === input.razorpay_signature) {
      //   await dbConnection;
      //   console.log(
      //     "🚀 ~ file: webhooks.router.ts:6 ~ activated:publicProcedure.mutation ~ opts:",
      //     opts,
      //   );
      //   return {success: true}
      // }

      // return {success: false}
    }),
});
