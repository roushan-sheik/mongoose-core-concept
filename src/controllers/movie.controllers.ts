import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import services from "../services";
import { ApiResponse, asyncHandler } from "../utils";

// create movie
const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const result = await services.createMovie(req.body);
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
