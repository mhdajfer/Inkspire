import mongoose, { Schema } from "mongoose";
import { IPost } from "../../shared/types/IPost";

const PostSchema: Schema<IPost> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String, trim: true }],
    coverImage: { type: String, default: null },
  },
  { timestamps: true }
);
