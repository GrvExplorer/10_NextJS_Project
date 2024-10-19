import mongoose from "mongoose";

enum SellerStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  ARCHIVED = "archived",
}

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNo: {
      type: String,
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

export const Seller =
  mongoose.models?.Seller || mongoose.model("Seller", sellerSchema);
