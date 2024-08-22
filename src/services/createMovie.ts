import { TMovie } from "../interfaces";
import { Movie } from "../models/movie.model";

const createMovie = async (payload: TMovie) => {
  const result = await Movie.create(payload);
  return result;
};

export { createMovie };
