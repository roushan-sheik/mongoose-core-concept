/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils";

const handleGlobalError = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
};

export default handleGlobalError;
