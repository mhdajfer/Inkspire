import { BlogRepository } from "../../domain/repositories/BlogRepositories";
import { BlogService } from "../../domain/services/BlogService";
import { IBlog } from "../../shared/types/IBlog";

export class BlogServiceImp implements BlogService {
  constructor(private _blogRepository: BlogRepository) {}
  async createBlog(blogData: IBlog): Promise<IBlog> {
    try {
      const newBlog = await this._blogRepository.createBlog(blogData);

      return newBlog;
    } catch (error) {
      throw error;
    }
  }
}
