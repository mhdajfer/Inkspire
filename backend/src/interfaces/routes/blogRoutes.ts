import express from "express";
import { BlogRepositoryImp } from "../../infrastructure/repositories/BlogRepositoriesImp";
import { BlogServiceImp } from "../../application/services/PostServiceImp";
import { BlogController } from "../controllers/BlogController";

const router = express.Router();

const blogRepository = new BlogRepositoryImp();
const blogService = new BlogServiceImp(blogRepository);
const blogController = new BlogController(blogService);

router.post("/", blogController.createBlog.bind(blogController));
router.post("/cover", blogController.getUploadUrl.bind(blogController));

export default router;
