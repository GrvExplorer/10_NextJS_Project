import mongoose from "mongoose";

const kitSchema = new mongoose.Schema(
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

    // FIXME: sub schema can be created here
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    tags: {
      type: [String],
    },

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

export const Kit = mongoose.models?.Kit || mongoose.model("Kit", kitSchema);
