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
  //* 1. searching ==================================>
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
  //* 2. pagination ===================================>
  const limit: number = Number(payload?.limit || 10);
  let skip: number = 0;
  if (payload?.page) {
    const page: number = Number(payload?.page || 1);
    skip = Number((page - 1) * limit);
  }
  const skipQuery = searchedMovies.skip(skip);
  const limitQuery = skipQuery.limit(limit);

  //* 3. Sorting ========================================>
  let sortBy = "-releaseDate";
  if (payload?.sortBy) {
    sortBy = payload.sortBy as string;
  }
  const sortedQuery = limitQuery.sort(sortBy);
  //* 4. filtering ===================================>
  const payloadObj = { ...payload };
  const excludeField = ["searchTerm", "limit", "page", "sortBy"];
  excludeField.forEach((filed) => delete payloadObj[filed]);

  const result = await sortedQuery.find(payloadObj);
  // http://localhost:8000/api/v1/movies?searchTerm=arifa&releaseDate=2000-01-16&page=1&limit=10&sortBy=releaseDate

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
