import mongoose from "mongoose";
import type { AdapterUser } from "next-auth/adapters";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // removes whitespace from the name field
    },
    email: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Date,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "kit",
      },
    ],

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const registerModel = mongoose.models?.User;

const User = registerModel || mongoose.model<AdapterUser>("User", userSchema);

export default User;
