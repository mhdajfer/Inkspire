import { IPost } from "../../shared/types/IPost";

export interface PostRepository {
  create(post: IPost): Promise<IPost>;
}
