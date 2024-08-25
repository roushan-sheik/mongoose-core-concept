import { TMovie } from "../interfaces";
import { Movie } from "../models/movie.model";

const createMovie = async (payload: TMovie) => {
  const result = new Movie(payload);
  // throw new ApiError(400, "Fake Error");
  const slug = result.createSlug(payload);
  result.slug = slug;
  return await result.save();
};
// get all movies
const getAllMovies = async () => {
  return await Movie.find();
};
// get single movie by id
const getSingleMovieById = async (id: string) => {
  return await Movie.findById(id);
};
// get single movie by slug
const getSingleMovieBySlug = async (slug: string) => {
  return await Movie.findOne({ slug: slug });
};

export { createMovie, getAllMovies, getSingleMovieById, getSingleMovieBySlug };
