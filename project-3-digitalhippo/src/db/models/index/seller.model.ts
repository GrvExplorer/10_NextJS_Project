import mongoose, { Model, Types } from "mongoose";

enum SellerStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  ARCHIVED = "archived",
}

export interface ISeller {
  userId: Types.ObjectId;
  name: string;
  address: string;
  phoneNo: number;
  email: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  kits: Types.ObjectId[];
  status: SellerStatus;
  rating: number;
}

const sellerSchema = new mongoose.Schema<ISeller>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    email: {
      type: String,
    },
    description: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    bannerUrl: {
      type: String,
    },
    kits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kit",
      },
    ],

    status: {
      type: String,
      enum: Object.values(SellerStatus),
      default: SellerStatus.ARCHIVED,
    },

    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const Seller: Model<ISeller> =
  mongoose.models?.Seller || mongoose.model<ISeller>("Seller", sellerSchema);
