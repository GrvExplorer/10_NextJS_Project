"use server";

import { connectToDB } from "@/db";
import Thread from "./models/thread.model";
import User from "./models/user.model";

// fetch user
export const fetchUserById = async (userId: string) => {
  try {
    await connectToDB();

    const user = await User.findOne({ id: userId }).exec();

    if (!user) {
      throw new Error(`Failed to fetch user`);
    }

    return JSON.stringify(user);
  } catch (error: any) {
    console.error(error);
  }
};

export const fetchUsers = async ({count}: {count: number}) => {
  try {
    await connectToDB();

    // FIXME: indexing
    const users = await User.find().limit(count).exec();

    if (!users) {
      throw new Error(`Failed to fetch users`);
    }

    return JSON.stringify(users);
  } catch (error) {
    console.log(error);
  }
}

export const fetchAllUsers = async () => {
  try {
    await connectToDB();

    // FIXME: indexing
    const users = await User.find({}).exec();;

    if (!users) {
      throw new Error(`Failed to fetch users`);
    }

    return JSON.stringify(users);
  } catch (error) {
    console.log(error);
  }
};

// fetch thread
export const fetchThreadById = async (threadId: string) => {
  try {
    await connectToDB();

    const thread = await Thread.findOne({ id: threadId }).exec();

    if (!thread) {
      throw new Error(`Failed to fetch thread`);
    }
    return JSON.stringify(thread);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllThreads = async () => {
  try {
    await connectToDB();

    // FIXME: indexing and pagination
    const threads = await Thread.find({}).exec();;

    if (!threads) {
      throw new Error(`Failed to fetch threads`);
    }

    return JSON.stringify(threads);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllThreadsOfUser = async (userId: string) => {
  try {
    await connectToDB();

    const userThreads = await Thread.find({ author: userId }).exec();

    if (!userThreads) {
      throw new Error(`Failed to fetch threads`);
    }

    return JSON.stringify(userThreads);
  } catch (error) {
    console.log(error);
  }
};
