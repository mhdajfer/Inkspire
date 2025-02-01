import { IBlog } from "./IBlog";

export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
  phoneNo: string;
  posts?: string[] | IBlog[];
  createdAt: Date;
  updatedAt: Date;
}
