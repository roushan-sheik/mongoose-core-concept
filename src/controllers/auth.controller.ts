import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import { authServices } from "../services";
import { ApiResponse, asyncHandler } from "../utils";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await authServices.register(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, newUser, "User created successfully"));
});
// login user
const loginUser = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await authServices.login(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });
  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, { accessToken }, "Login successfully")
    );
});

export const authController = {
  registerUser,
  loginUser,
};
