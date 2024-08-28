import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "../services";
import { ApiResponse, asyncHandler } from "../utils";

const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admin = await userService.createAdminIntoDB(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, admin, "Admin created successfully"));
});
// update user
const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updatedUser = await userService.updateUserInDB(userId, req.body);
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

export const userController = { createAdmin, updateUser };
