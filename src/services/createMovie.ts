import { TMovie } from "../interfaces";
import { Movie } from "../models/movie.model";

const createMovie = async (payload: TMovie) => {
  return await Movie.create(payload);
};
// get all movies
const getAllMovies = async () => {
  return await Movie.find();
};
// get single movie by id
const getSingleMovieById = async (id: string) => {
  return await Movie.findById(id);
};

export { createMovie, getAllMovies, getSingleMovieById };
