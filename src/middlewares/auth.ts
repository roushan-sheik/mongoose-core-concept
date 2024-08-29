import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../config";
import { User_Role, User_Status } from "../constant/user.constant";
import { User } from "../models/user.model";
import { ApiError, asyncHandler } from "../utils";

const auth = (...requiredRoles: (keyof typeof User_Role)[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = req.headers?.authorization || req.body.accessToken;
      if (!accessToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorize access");
      }
      // decodet the token
      const decodedToken = jwt.verify(
        accessToken,
        config.access_token_secret as string
      );
      const { email, role } = decodedToken as jwt.JwtPayload;
      // find the user
      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "User not found");
      }
      // check block or not
      if (user.status === User_Status.BLOCKED) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "User is blocked");
      }
      // check role
      if (!requiredRoles.includes(role)) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          "You are not authorized to access this route."
        );
      }
      next();
    }
  );
};
export default auth;
