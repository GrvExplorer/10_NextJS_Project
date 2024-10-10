"use server";

import dbConnection from "@/db";
import User from "@/models/user.model";
import { Document, Types } from "mongoose";
import type { AdapterUser } from "next-auth/adapters";

export const fetchUser = async () => {
  try {
    await dbConnection;

    const res = await User.find({});

    const json: (Document<unknown, {}, AdapterUser> &
      AdapterUser & {
        _id: Types.ObjectId;
      })[] = JSON.parse(JSON.stringify(res));

    return json;
  } catch (error) {
    console.log("🚀 ~ file: page.tsx:16 ~ fetchUser ~ error:", error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await dbConnection;

    const res = await User.findOne({ email });

    const json:
      | (Document<unknown, {}, AdapterUser> &
          AdapterUser & {
            _id: Types.ObjectId;
          })
      | null = JSON.parse(JSON.stringify(res));

    return json;
  } catch (error) {
    console.log("🚀 ~ file: page.tsx:26 ~ getUserByEmail ~ error:", error);
  }
};
