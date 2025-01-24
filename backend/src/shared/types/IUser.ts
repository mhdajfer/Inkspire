import mongoose from "mongoose";

export interface IUser extends Document {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
  phoneNo: string;
  posts?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
