import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { reviewService } from "../services";
import { ApiResponse, asyncHandler } from "../utils";

// create review
const createReview = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const review = await reviewService.createReview(slug, req.body);
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, review, "Review is created"));
});

const getAllReviews = async (req: Request, res: Response) => {
  try {
    res.status(StatusCodes.OK).json({ Hello: "Hi" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
export const reviewController = { createReview, getAllReviews };
