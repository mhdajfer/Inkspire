import { IUser } from "../../shared/types/IUser";

export interface UserRepository {
  create(userData: IUser): Promise<IUser>;
  findOne(email: string): Promise<IUser>;
}
