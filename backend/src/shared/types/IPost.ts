import mongoose from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  tags?: string[];
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}