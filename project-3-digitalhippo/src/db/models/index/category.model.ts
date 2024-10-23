
import mongoose, { Model, Types } from "mongoose";

export interface ICategory {
  name: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // slug: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
});

export const Category: Model<ICategory> = mongoose.models?.Category || mongoose.model<ICategory>("Category", categorySchema);
