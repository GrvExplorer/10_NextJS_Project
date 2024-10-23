import mongoose, { Model, Types } from "mongoose";

export interface IKit {
  productName: string;
  features: string[];
  description: string;
  price: number;
  images: string[];
  category: Types.ObjectId[];
  tags: string[];
  seller: Types.ObjectId;
  orders: Types.ObjectId[];
  isPublished: boolean;
  reviews: Types.ObjectId[];
}

const kitSchema = new mongoose.Schema<IKit>(
  {
    productName: {
      type: String,
    },

    features: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
    },

    price: {
      type: Number,
    },

    images: [
      {
        type: String,
      },
    ],

    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    tags: [{
      type: String,
    }],

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true },
);

export const Kit: Model<IKit> = mongoose.models?.Kit || mongoose.model<IKit>("Kit", kitSchema);
