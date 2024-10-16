import mongoose, { mongo } from "mongoose";

const sellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  logo: {
    type: String,
  },
  banner: {
    type: String,
  },
  kits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kit',
  }],

  verified: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
  },
}, {
  timestamps: true,
});

export const Seller = mongoose.models?.Seller || mongoose.model('Seller', sellerSchema);
  