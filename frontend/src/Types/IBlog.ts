export interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  coverImage?: File | string;
  createdAt: string;
  updatedAt: string;
}
