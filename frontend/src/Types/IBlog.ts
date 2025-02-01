import { IUser } from "./IUser";

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: string | IUser;
  tags?: string[];
  coverImage?: File | string;
  createdAt: string;
  updatedAt: string;
}
