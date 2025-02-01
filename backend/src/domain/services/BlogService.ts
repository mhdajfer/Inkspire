import { IBlog } from "../../shared/types/IBlog";

export interface BlogService {
  createBlog(blogData: IBlog): Promise<IBlog>;
  getAllBlogs(): Promise<IBlog[]>;
  getOneBlog(blogId: string): Promise<IBlog>;
  getMyBlogs(userId: string): Promise<IBlog[]>
  editBlog(blogData: Partial<IBlog>): Promise<IBlog>
}
