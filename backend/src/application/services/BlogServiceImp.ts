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

  async getAllBlogs(): Promise<IBlog[]> {
    try {
      return await this._blogRepository.getAllBlogs();
    } catch (error) {
      throw error;
    }
  }

  async getOneBlog(blogId: string): Promise<IBlog> {
    try {
      return await this._blogRepository.findBlog(blogId);
    } catch (error) {
      throw error;
    }
  }

  async getMyBlogs(userId: string): Promise<IBlog[]> {
    try {
      return await this._blogRepository.getMyBlogs(userId);
    } catch (error) {
      throw error;
    }
  }

  async editBlog(blogData: Partial<IBlog>): Promise<IBlog> {
    try {
      return await this._blogRepository.editBlog(blogData);
    } catch (error) {
      throw error;
    }
  }
}
