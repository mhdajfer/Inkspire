import express from "express";
import { BlogRepositoryImp } from "../../infrastructure/repositories/BlogRepositoriesImp";
import { BlogServiceImp } from "../../application/services/BlogServiceImp";
import { BlogController } from "../controllers/BlogController";
import userAuth from "../middlewares/userAuth";

const router = express.Router();

const blogRepository = new BlogRepositoryImp();
const blogService = new BlogServiceImp(blogRepository);
const blogController = new BlogController(blogService);

router.get("/", blogController.getAllBlogs.bind(blogController));
router.get(
  "/myblogs",
  userAuth,
  blogController.getAllBlogs.bind(blogController)
);
router.delete("/:id", blogController.deleteBlog.bind(blogController));
router.get("/:id", blogController.getOneBlog.bind(blogController));
router.put("/:id", blogController.editBlog.bind(blogController));
router.post("/", blogController.createBlog.bind(blogController));
router.post("/cover", blogController.getUploadUrl.bind(blogController));

export default router;
