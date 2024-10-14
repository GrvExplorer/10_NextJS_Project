import dbConnection from "@/db";
import User from "@/models/user.model";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { BecomeSellerProp } from "@/types/user.type";

export const userRouter = createTRPCRouter({
  userList: publicProcedure.query(async () => {
    await dbConnection;
    const users = await User.find({});

    return users;
  }),
  becomeSeller: publicProcedure.mutation(async ({req, headers}) => {
  }
});
