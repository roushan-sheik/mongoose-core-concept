import { format } from "date-fns";
import slugify from "slugify";
import { TMovie } from "../interfaces";
import { Movie } from "../models/movie.model";

const createMovie = async (payload: TMovie) => {
  // make a slug by date and title
  const date = format(payload.releaseDate, "MM/dd/yyyy");
  const slug = slugify(`${payload.title}-${date}`, { lower: true });

  return await Movie.create({ ...payload, slug });
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
