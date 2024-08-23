/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import services from "../services";

// create review 
const createReview = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const review = await services.createReview(slug, req.body);
    res
      .status(200)
      .json({ success: true, message: "Review Created", data: review });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getAllReviews = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ Hello: "Hi" });
  } catch (error) {
    res.status(500).json(error);
  }
};
export { getAllReviews, createReview };
