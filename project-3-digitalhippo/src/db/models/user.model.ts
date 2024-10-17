import mongoose, { Model } from "mongoose";
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
    seller: {
      type: Boolean,
      default: false,
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
