import dbConnection from "@/db";
import User from "@/models/user.model";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";

export const userRouter = createTRPCRouter({
  userList: publicProcedure.query(async () => {
    await dbConnection;
    const users = await User.find({});

    return users;
  }),
});
