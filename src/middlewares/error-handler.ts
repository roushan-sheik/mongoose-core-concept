/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { handleCastError, handleValidationError } from "../errors";
import { TCustomError } from "../interfaces";

const handleGlobalError: ErrorRequestHandler = (err, req, res, next) => {
  // Making a custom error object
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
  if (err.name === "ValidationError") {
    const simplified = handleValidationError(err);
    customError.errorSources = simplified;
    customError.message = err.name;
  } else if (err.name === "CastError") {
    const simplified = handleCastError(err);
    customError.errorSources = simplified;
    customError.message = err.name;
  }

  res.status(customError.statusCode).json(customError);
};

export default handleGlobalError;
