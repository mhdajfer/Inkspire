import express from "express";
import { UserRepositoriesImp } from "../../infrastructure/repositories/UserRepositoriesImp";
import { UserServiceImp } from "../../application/services/UserServiceImp";
import { UserController } from "../controllers/UserController";

const router = express.Router();

const userRepository = new UserRepositoriesImp();
const userService = new UserServiceImp(userRepository);
const userController = new UserController(userService);

router.get("/", (req, res) => {
  res.send("Hello from userRoutes!");
});

router.put("/", userController.editUser.bind(userController));

router.post("/", userController.createUser.bind(userController));
router.post("/login", userController.login.bind(userController));

export default router;
