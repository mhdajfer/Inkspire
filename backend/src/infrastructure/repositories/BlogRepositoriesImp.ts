import Blog from "../../domain/models/Blog";
import { BlogRepository } from "../../domain/repositories/BlogRepositories";
import { CustomError } from "../../shared/errors/CustomError";
import { IBlog } from "../../shared/types/IBlog";
import { StatusCode } from "../../shared/types/StatusCode";

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
      const blog = await Blog.findOne({ _id: id }).populate(
        "author",
        "fullName email"
      );

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
      const blogs = await Blog.find({ author: userId }).populate({
        path: "author", // Field to populate
        select: "fullName email", // Fields to include from the referenced collection
      });

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
      ).populate("author", "fullName email");

      return updatedBlog as IBlog;
    } catch (error) {
      throw error;
    }
  }

  async deleteBlog(blogId: string): Promise<void> {
    try {
      const result = await Blog.deleteOne({ _id: blogId });

      if (result.deletedCount === 0) {
        throw new CustomError(
          "Blog not found or already deleted.",
          StatusCode.BAD_REQUEST
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
