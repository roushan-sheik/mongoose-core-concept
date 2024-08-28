import { StatusCodes } from "http-status-codes";
import Jwt from "jsonwebtoken";
import config from "../config";
import { User_Role, User_Status } from "../constant/user.constant";
import { TLoginUser, TUser } from "../interfaces";
import { TToken } from "../interfaces/auth.interface";
import { User } from "../models/user.model";
import { ApiError } from "../utils";
import { isPasswordMatch } from "../utils/auth.utils";

// Register User
const register = async (payload: TUser): Promise<TUser> => {
  // check by email is user exists
  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "User already exists with this email"
    );
  }
  // setRole to user
  payload.role = User_Role.USER;
  const newUser = await User.create(payload);
  newUser.password = "";
  return newUser;
};
// Login User
const login = async (payload: TLoginUser): Promise<TToken> => {
  // find user with email
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No user found with this email");
  }
  // check is user blocked or not
  if (user.status === User_Status.BLOCKED) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User is blocked");
  }
  // match the user password
  const match = await isPasswordMatch(payload.password, user.password);
  if (!match) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Credentials");
  }
  // generate access token and refresh token
  const jwtPayload = {
    email: user.email,
    password: user.password,
  };
  const accessToken = Jwt.sign(
    jwtPayload,
    config.access_token_secret as string,
    {
      expiresIn: config.access_token_expiry,
    }
  );
  const refreshToken = Jwt.sign(
    jwtPayload,
    config.refresh_token_secret as string,
    {
      expiresIn: config.refresh_token_expiry,
    }
  );
  return { accessToken, refreshToken };
};
export const authServices = {
  register,
  login,
};
