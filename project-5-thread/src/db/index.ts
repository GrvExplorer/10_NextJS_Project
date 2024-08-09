import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.DATABASE_URL) return console.log("Missing MongoDB URL");
  if (isConnected) return console.log("Already connected to MongoDB");

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL);

    isConnected = true;

    console.log("Connected to MongoDB");
    return db;
  } catch (error: any) {
    console.log("🚀 ~ connectToDB ~ error:", error.message);
  }
};
