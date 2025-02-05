import { UserRepository } from "../../domain/repositories/UserRepositories";
import { UserService } from "../../domain/services/UserService";
import { CustomError } from "../../shared/errors/CustomError";
import { IUser } from "../../shared/types/IUser";
import { StatusCode } from "../../shared/types/StatusCode";
import bcrypt from "bcryptjs";
import { AuthUtils } from "../../shared/Utils/authUtils";

export class UserServiceImp implements UserService {
  constructor(private _userRepository: UserRepository) {}

  async createUser(userData: IUser): Promise<IUser> {
    try {
      const existUser = await this._userRepository.findOne(userData.email);

      if (existUser)
        throw new CustomError("User already exists", StatusCode.FORBIDDEN);

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      userData = { ...userData, password: hashedPassword };

      const newUser = await this._userRepository.create(userData);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    try {
      const user = await this._userRepository.findOne(email);

      if (!user) {
        throw new CustomError("User not found", StatusCode.CONFLICT);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new CustomError("Incorrect Password", StatusCode.CONFLICT);
      }

      const token = AuthUtils.generateToken({
        _id: user?._id || "",
        fullName: user?.fullName,
        email: user.email,
      });

      return { token, user };
    } catch (error) {
      throw error;
    }
  }

  async editUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      return await this._userRepository.editUser(userData);
    } catch (error) {
      throw error;
    }
  }
}
