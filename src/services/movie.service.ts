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
const getAllMovies = async (payload: Record<string, unknown>) => {
  // searching
  let searchTerm = "";
  if (payload?.searchTerm) {
    searchTerm = payload.searchTerm as string;
  }
  const searchableFields = ["title", "genre"];
  const searchedMovies = Movie.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
  // filtering
  const payloadObj = { ...payload };
  const excludeField = ["searchTerm"];
  excludeField.forEach((filed) => delete payloadObj[filed]);
  const result = await searchedMovies.find(payloadObj);
  return result;
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
