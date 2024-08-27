import { Request, Response } from "express";
import { userService } from "../services";
import { ApiResponse, asyncHandler } from "../utils";

const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admin = await userService.createAdminIntoDB(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, admin, "Admin created successfully"));
});

export const userController = { createAdmin };
