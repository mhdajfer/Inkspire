import { IBlog } from "../../shared/types/IBlog";

export interface BlogService {
  createBlog(blogData: IBlog): Promise<IBlog>;
}
