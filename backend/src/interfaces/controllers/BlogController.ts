import { NextFunction, Request, Response } from "express";
import { BlogService } from "../../domain/services/BlogService";
import { StatusCode } from "../../shared/types/StatusCode";

import { S3Service } from "../../infrastructure/services/s3Service";
import { CustomRequest } from "../../shared/types/CustomRequest";
import { CustomError } from "../../shared/errors/CustomError";

export class BlogController {
  private _s3Service: S3Service;
  constructor(private _blogService: BlogService) {
    this._s3Service = new S3Service();
  }

  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogData } = req.body;

      const createdBlog = await this._blogService.createBlog(blogData);

      res.status(StatusCode.CREATED).json({
        success: true,
        data: createdBlog,
        message: "blog created successfully",
      });
    } catch (error) {
      console.log("error while creating blog", error);
      throw error;
    }
  }

  async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const blogs = await this._blogService.getAllBlogs();

      res.status(StatusCode.OK).json({
        success: true,
        data: blogs,
        message: "successfully retrieved all blogs",
      });
    } catch (error) {
      console.log("error while getting all blogs", error);
      throw error;
    }
  }

  async getUploadUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { filename, fileType } = req.body;

      const uploadUrl = await this._s3Service.getUploadSignedUrl(
        filename,
        fileType
      );

      res
        .status(StatusCode.OK)
        .json({ success: true, uploadUrl, message: "upload url configured" });
    } catch (error) {
      console.log("error while getting upload url", error);
      next(error);
    }
  }

  async getOneBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: blogId } = req.params;

      const blog = await this._blogService.getOneBlog(blogId);

      res.status(StatusCode.OK).json({
        success: true,
        message: "blog successfully retrieved",
        data: blog,
      });
    } catch (error) {
      console.log("error while getting single blog", error);
      next(error);
    }
  }

  async getMyBlogs(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user || !user?._id)
        throw new CustomError("Invalid credentials", StatusCode.BAD_REQUEST);

      const blogs = await this._blogService.getMyBlogs(user._id);

      res.status(StatusCode.OK).json({
        success: true,
        message: "successfully retrieved blogs",
        data: blogs,
      });
    } catch (error) {
      console.log("error while getting blogs", error);
      next(error);
    }
  }

  async editBlog(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { blogData } = req.body;

      const updatedBlog = await this._blogService.editBlog(blogData);

      res.status(StatusCode.OK).json({
        success: true,
        message: "updated blog successfully",
        data: updatedBlog,
      });
    } catch (error) {
      console.log("error while editing blog", error);
      next(error);
    }
  }

  async deleteBlog(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      console.log(`deleting ${id}`);
      await this._blogService.deleteBlog(id);

      res.status(StatusCode.OK).json({
        success: true,
        message: "deleted blog successfully",
        data: null,
      });
    } catch (error) {
      console.log("error while deleting blog", error);
      next(error);
    }
  }
}
