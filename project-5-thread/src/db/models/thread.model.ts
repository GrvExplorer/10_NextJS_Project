import mongoose, { Document } from "mongoose";

// export interface IThread extends Document {
//   text: string;
//   author: string;
//   community: string;
//   createdAt: Date;
//   parentId: string;
//   replies: string[];
// }

const ThreadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

console.log("Mongoose Models:", mongoose.models);

let Thread;
if (!mongoose.models) {
  Thread = mongoose.model("Thread", ThreadSchema);
} else {
  Thread = mongoose.models.Thread;
}

// FIXME: error model undefined I am stuck here.
// const Thread = mongoose.models.Thread || mongoose.model("Thread", ThreadSchema)

export default Thread;
