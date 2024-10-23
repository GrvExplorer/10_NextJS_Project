import mongoose, { Model, Types } from "mongoose";

enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface IOrder {
  user: Types.ObjectId;
  kits: Types.ObjectId[];
  status: OrderStatus;
  total: number;
  shippingAddress: string;
  shippingPrice: number;
  paymentMethod: string;
  paymentReference: string;
  isPaid: boolean;
  createdAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  kits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "kit",
    required: true,
  }],
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  total: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  shippingPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentReference: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Order: Model<IOrder> = mongoose.models?.Order || mongoose.model<IOrder>('Order', orderSchema)