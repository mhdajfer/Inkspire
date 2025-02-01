import Blog from "../../domain/models/Blog";
import { BlogRepository } from "../../domain/repositories/BlogRepositories";
import { IBlog } from "../../shared/types/IBlog";

export class BlogRepositoryImp implements BlogRepository {
  async createBlog(blog: IBlog): Promise<IBlog> {
    try {
      const blogDoc = new Blog(blog);

      await blogDoc.save();

      return blogDoc as IBlog;
    } catch (error) {
      throw error;
    }
  }
  async findBlog(id: string): Promise<IBlog> {
    try {
      const blog = await Blog.findOne({ _id: id });

      return blog as IBlog;
    } catch (error) {
      throw error;
    }
  }

  async getAllBlogs(): Promise<IBlog[]> {
    try {
      const blogs = await Blog.find();

      return blogs as IBlog[];
    } catch (error) {
      throw error;
    }
  }

  async getMyBlogs(userId: string): Promise<IBlog[]> {
    try {
      const blogs = await Blog.find({ author: userId });

      return blogs;
    } catch (error) {
      throw error;
    }
  }

  async editBlog(blogData: Partial<IBlog>): Promise<IBlog> {
    try {
      const { _id, ...blog } = blogData;

      const updatedBlog = await Blog.findOneAndUpdate(
        { _id },
        { $set: blog },
        { new: true }
      );

      return updatedBlog as IBlog;
    } catch (error) {
      throw error;
    }
  }
}
