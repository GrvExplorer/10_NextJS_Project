import { connectToDB } from "@/db";
// @ts-ignore
import Thread from "@/db/models/thread.model";
import User from "@/db/models/user.model";
import { revalidatePath } from "next/cache";

// thread
export const createThread = async (thread: {
  author: string;
  content: string;
}) => {
  try {
    await connectToDB();

// @ts-ignore
    const newThread = await Thread.create({
      author: thread.author,
      text: thread.content,
    });
    console.log("🚀 ~ file: user.actions.ts:72 ~ newThread:", newThread);

    revalidatePath("/feed", "page");

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

export async function deleteThread(id: string, path: string) {
  try {
    await connectToDB();

    // throw new Error("Thread deleted");

    await Thread.deleteOne({ id: id });

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

export async function replyToThread({authorId, text, parentId}:{
  authorId: string
  text: string
  parentId: string
}) {
  try {
    
    await connectToDB()

    const replyThread = await Thread.create({
      author: authorId,
      text,
      parentId,
    }, {
      upsert: true,
    })
    console.log("🚀 ~ file: thread.actions.ts:73 ~ replyThread:", replyThread)


    revalidatePath(`/thread/${parentId}`, "page");

    return {
      success: true,
      status: 200,
      reply: JSON.stringify(replyThread),
    }

  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message,
      status: 500,
    }
    
  }
}