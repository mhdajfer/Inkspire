import { IUser } from "../../shared/types/IUser";

export interface UserService {
  createUser(userData: IUser): Promise<IUser>;
  login(
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }>;
  editUser(userData: Partial<IUser>): Promise<IUser>;
}
