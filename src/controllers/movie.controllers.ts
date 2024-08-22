/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import services from "../services";

// create movie
const createMovie = async (req: Request, res: Response) => {
  try {
    const result = await services.createMovie(req.body);
    res
      .status(201)
      .json({ success: true, message: "User created", data: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// get all movies
const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await services.getAllMovies();
    res.status(200).json({ success: true, movies });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// get movie by id
const getMovieById = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const result = await services.getSingleMovieById(id);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// get movie by Slug
const getMovieBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await services.getSingleMovieBySlug(slug);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { createMovie, getAllMovies, getMovieById, getMovieBySlug };
