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
  //* searching ==================================>
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
  //* pagination ===================================>
  // 1st  skip = 0
  // 2nd skip = 2*10 - 1*10
  // 3rd skip = 3*10 - 2*10
  // skip = page-1 * limit
  const limit: number = Number(payload?.limit || 10);
  let skip: number = 0;
  if (payload?.page) {
    const page: number = Number(payload?.page || 1);
    skip = Number((page - 1) * limit);
  }
  const skipQuery = searchedMovies.skip(skip);
  const limitQuery = skipQuery.limit(limit);

  //* filtering ===================================>
  const payloadObj = { ...payload };
  const excludeField = ["searchTerm", "limit", "page"];
  excludeField.forEach((filed) => delete payloadObj[filed]);

  const result = await limitQuery.find(payloadObj);

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
