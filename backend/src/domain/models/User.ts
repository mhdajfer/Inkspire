import mongoose, { Schema } from "mongoose";
import { IUser } from "../../shared/types/IUser";

const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true, trim: true },
    profilePicture: { type: String, default: null },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
