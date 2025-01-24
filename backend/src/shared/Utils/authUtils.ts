import jwt from "jsonwebtoken";
import { CustomError } from "../errors/CustomError";
import { StatusCode } from "../types/StatusCode";
import { IUser } from "../types/IUser";

export class AuthUtils {
  static generateToken(payload: { id: string; email: string }): string {
    const secret = process.env.SECRET_KEY;
    const expiresIn = process.env.JWT_EXPIRATION;

    if (!secret) {
      throw new CustomError(
        "JWT secret key is not defined",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }

    if (!expiresIn) {
      throw new CustomError(
        "JWT expiration time is not defined",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
    console.log(payload);

    try {
      return jwt.sign(payload, secret, { expiresIn });
    } catch (error) {
      console.log(error);
      throw new CustomError(
        "Error generating token",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
