import mongoose, { Model, Types } from "mongoose";
import { User as IUser } from "next-auth";

export interface AdapterUser extends IUser {
  id: string;
  email: string;
  emailVerified: Date | null;
  isSeller: boolean;
  sellerId: Types.ObjectId;
  cartItems: Types.ObjectId;
  orders: Types.ObjectId;
}

const userSchema = new mongoose.Schema<AdapterUser>(
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
      type: Date || null,
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

const User: Model<AdapterUser> =
  registerModel || mongoose.model<AdapterUser>("User", userSchema);

export default User;
