import User from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepositories";
import { IUser } from "../../shared/types/IUser";

export class UserRepositoriesImp implements UserRepository {
  async findOne(email: string): Promise<IUser> {
    try {
      const user = await User.findOne({ email });

      return user as IUser;
    } catch (error) {
      throw error;
    }
  }
  async create(userData: IUser): Promise<IUser> {
    try {
      const newDoc = new User(userData);

      await newDoc.save();

      return newDoc as IUser;
    } catch (error) {
      throw error;
    }
  }
}
