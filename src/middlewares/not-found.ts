import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils";

const notFound = (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json(new ApiResponse(StatusCodes.NOT_FOUND, "Not Found"));
};
export default notFound;
