import { timeStamp } from "console";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

const Category = mongoose.models?.Category || mongoose.model("Category", categorySchema);
