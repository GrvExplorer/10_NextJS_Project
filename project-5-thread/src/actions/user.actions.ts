"use server";

import { connectToDB } from "@/db";
import Thread from "@/db/models/thread.model";
import User from "@/db/models/user.model";
import mongoose from "mongoose";

// user
export const updateUser = async (user: any) => {
  try {
    await connectToDB();

    // FIXME: not give the permission to use existing username and provide them feedback for it.
    const updateUser = await User.findOneAndReplace(
      { id: user.userId },
      {
        id: user.userId,
        name: user.name,
        image: user.image,
        username: user.username.toLowerCase().replace(/ /g, ""),
        bio: user.bio,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );

    return {
      status: 200,
      success: true,
      user: JSON.stringify(updateUser),
    };
  } catch (error) {
    // console.error(error);
    // console.log(error);
    if (error instanceof mongoose.Error) {
      switch (error.cause) {
        case "E11000":
          return {
            status: 409,
            success: false,
            error: error.cause,
            message: "Username already exists",
          };
        default:
          console.log("default: ", error);
          return {
            status: 500,
            success: false,
            error: error.cause,
          };
      }
    }

    throw error;
  }
};

// thread
export const createThread = async (thread: {
  author: string;
  content: string;
}) => {
  try {
    await connectToDB();

    const newThread = await Thread.create({
      author: thread.author,
      text: thread.content,
    });
    console.log("🚀 ~ file: user.actions.ts:72 ~ newThread:", newThread)


    return {
      status: 200,
      success: true,
      thread: JSON.stringify(newThread),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      success: false,
      error: error.message,
    };
  }
};

export async function deleteThread(id: string) {
  try {
    await connectToDB();

    await Thread.deleteOne({ id: id });

    return {
      status: 200,
      success: true,
      message: "Thread deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      success: false,
      error: error.message,
    };
  }
}
