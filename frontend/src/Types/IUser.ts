import { BlogPost } from "./blog";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
  phoneNo: string;
  posts?: string[] | BlogPost[];
  createdAt: Date;
  updatedAt: Date;
}
