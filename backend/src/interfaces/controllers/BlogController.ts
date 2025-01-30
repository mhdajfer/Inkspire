import { NextFunction, Request, Response } from "express";
import { BlogService } from "../../domain/services/BlogService";
import { StatusCode } from "../../shared/types/StatusCode";

import { S3Service } from "../../infrastructure/services/s3Service";

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
}
