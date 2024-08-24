/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { handleCastError, handleValidationError } from "../errors";
import { TCustomError } from "../interfaces";
import { ApiError } from "../utils";

const handleGlobalError = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Making a custom error object
  const customError: TCustomError = {
    success: err.success,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong.",
    errorSources: [
      {
        path: "",
        message: err.message || "Something went wrong",
      },
    ],
  };
  if (err.name === "ValidationError") {
    const simplified = handleValidationError(err);
    customError.errorSources = simplified;
    customError.message = err.name;
  } else if (err.name === "CastError") {
    const simplified = handleCastError(err);
    customError.errorSources = simplified;
  }

  res.status(customError.statusCode).json(customError);
};

export default handleGlobalError;
