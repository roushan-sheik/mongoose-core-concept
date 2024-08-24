import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import services from "../services";
import { ApiResponse, asyncHandler } from "../utils";

const zodMovieSchema = z.object({
  title: z.string(),
  description: z.string(),
  releaseDate: z.string().date(),
  genre: z.string(),
  isDeleted: z.boolean().optional(),
});
// create movie
const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const movieData = req.body;
  zodMovieSchema.parse(movieData);
  const result = await services.createMovie(movieData);
  res
    .status(StatusCodes.CREATED)
    .json(new ApiResponse(StatusCodes.CREATED, result, "User created"));
});
// get all movies
const getAllMovies = asyncHandler(async (req: Request, res: Response) => {
  const movies = await services.getAllMovies();
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, movies));
});
// get movie by id
const getMovieById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await services.getSingleMovieById(id);
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, result));
});
// get movie by Slug
const getMovieBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await services.getSingleMovieBySlug(slug);
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, result));
});

export { createMovie, getAllMovies, getMovieById, getMovieBySlug };
