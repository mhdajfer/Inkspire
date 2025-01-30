import { IBlog } from "../../shared/types/IBlog";

export interface BlogRepository {
  createBlog(post: IBlog): Promise<IBlog>;
  findBlog(id: string): Promise<IBlog>;
}
