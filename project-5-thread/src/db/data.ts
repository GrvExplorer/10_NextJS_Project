"use server";

import { connectToDB } from "@/db";
import User from "./models/user.model";

export const fetchUserById = async (userId: string) => {
  try {
    await connectToDB();

    const user = await User.findOne({ id: userId });
    console.log("🚀 ~ file: data.ts:11 ~ fetchUserById ~ user:", user)


    if (!user) {
      throw new Error(`Failed to fetch user`);
    }

    return JSON.stringify(user);
  } catch (error: any) {
    console.error(error);
  }
};
