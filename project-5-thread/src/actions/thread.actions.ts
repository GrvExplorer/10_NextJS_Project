"use server";
import { connectToDB } from "@/db";
import { Thread } from "@/db/models/thread.model";
import User from "@/db/models/user.model";
import { revalidatePath } from "next/cache";

export const createThread = async ({
  thread,
  author,
}: {
  thread: string;
  author: string;
}) => {
  try {
    await connectToDB();
    
    const createThread = await Thread.create({
      text: thread,
      author,
    });

    if (!createThread)
      return {
        success: false,
        error: "not able to create Thread",
      };

    await User.findByIdAndUpdate(author, {
      $push: {threads: createThread._id}
    });

    return {
      success: true,
      message: "Thread created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export async function deleteThread(id: string, path: string) {
  try {
    await connectToDB();

    // throw new Error("Thread deleted");

    await Thread.deleteOne({ _id: id });

    revalidatePath(path, "page");

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

export async function replyToThread({
  authorId,
  text,
  parentId,
}: {
  authorId: string;
  text: string;
  parentId: string;
}) {
  try {
    await connectToDB();

    const replyThread = await Thread.create({
      author: authorId,
      text,
      parentId,
    });

    await Thread.findByIdAndUpdate(parentId, {
      $push: { "sub-threads": replyThread._id },
    });

    revalidatePath(`/thread/${parentId}`, "page");

    return {
      success: true,
      status: 200,
      reply: JSON.stringify(replyThread),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
}
