import { Request, Response } from "express";
import services from "../services";

const createMovie = async (req: Request, res: Response) => {
  try {
    const result = await services.createMovie(req.body);
    res
      .status(201)
      .json({ success: true, message: "User created", data: result });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { createMovie };
