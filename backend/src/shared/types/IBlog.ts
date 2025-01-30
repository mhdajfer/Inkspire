import mongoose from "mongoose";

export interface IBlog extends Document {
  _id?: string;
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  tags?: string[];
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
