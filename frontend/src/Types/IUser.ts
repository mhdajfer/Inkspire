import { BlogPost } from "./blog";

export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
  phoneNo: string;
  posts?: string[] | BlogPost[];
  createdAt: Date;
  updatedAt: Date;
}
