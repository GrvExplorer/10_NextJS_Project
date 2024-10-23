import mongoose, { Types } from "mongoose";

export interface IReview extends mongoose.Document {
  user: Types.ObjectId;
  kit: Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    kit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kit",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Review: mongoose.Model<IReview> =
  mongoose.models?.Review || mongoose.model<IReview>("Review", reviewSchema);
