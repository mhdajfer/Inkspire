import { NextFunction, Request, Response } from "express";
import { IUser } from "../../shared/types/IUser";
import { UserService } from "../../domain/services/UserService";
import { StatusCode } from "../../shared/types/StatusCode";

export class UserController {
  constructor(private _userService: UserService) {}

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: IUser = req.body["formData"];

      console.log(userData);

      const createdUser = await this._userService.createUser(userData);

      res.status(StatusCode.CREATED).json({
        success: true,
        message: "user created successfully",
        data: createdUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const { token, user } = await this._userService.login(email, password);

      res.status(StatusCode.OK).json({
        success: true,
        message: "user successfully logged in",
        user,
        token,
      });
    } catch (error) {
      console.log("error while login", error);
      next(error);
    }
  }
}
