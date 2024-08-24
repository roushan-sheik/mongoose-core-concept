/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import {
  handleCastError,
  handleDuplicateError,
  handleValidationError,
} from "../errors";
import { TCustomError } from "../interfaces";

const handleGlobalError: ErrorRequestHandler = (err, req, res, next) => {
  //* Making a custom error object
  const customError: TCustomError = {
    success: err.success || false,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong.",
    errorSources: [
      {
        path: "",
        message: err.message || "Something went wrong",
      },
    ],
  };
  //* Handle Zod Error
  if (err instanceof ZodError) {
    const handledError = err.issues.map((error) => {
      return {
        path: error.path[error.path.length - 1],
        message: error.message,
      };
    });
    customError.errorSources = handledError;
    customError.message = err.name;
  }
  //* Mongoose Errors
  // Validation error => missing field
  if (err.name === "ValidationError") {
    const simplified = handleValidationError(err);
    customError.errorSources = simplified;
    customError.message = err.name;
    // Cast error => missing type or mongodb dynamic params
  } else if (err.name === "CastError") {
    const simplified = handleCastError(err);
    customError.errorSources = simplified;
    customError.message = err.name;
    // Duplicate Error => Unique true
  } else if (err.code === 11000) {
    const simplified = handleDuplicateError(err);
    customError.errorSources = simplified;
  }

  res.status(customError.statusCode).json(customError);
};

export default handleGlobalError;
