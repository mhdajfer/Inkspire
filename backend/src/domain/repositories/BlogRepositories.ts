import { IBlog } from "../../shared/types/IBlog";

export interface BlogRepository {
  createBlog(post: IBlog): Promise<IBlog>;
  findBlog(id: string): Promise<IBlog>;
  getAllBlogs(): Promise<IBlog[]>;
  getMyBlogs(userId: string): Promise<IBlog[]>;
  editBlog(blogData: Partial<IBlog>): Promise<IBlog>;
  deleteBlog(blogId: string): Promise<void>;
}
