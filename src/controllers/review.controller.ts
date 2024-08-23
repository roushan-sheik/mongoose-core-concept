import { Request, Response } from "express";

const getAllReviews = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ Hello: "Hi" });
  } catch (error) {
    res.status(500).json(error);
  }
};
export { getAllReviews };
