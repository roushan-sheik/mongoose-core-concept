import { Model } from "mongoose";

export type TMovie = {
  title: string;
  description: string;
  releaseDate: Date; // or Date if you're working with Date objects
  genre: string;
  isDeleted: boolean;
  viewCount: number;
  slug: string;
  totalRating: number;
};
// instance method type
// Put all user instance methods in this interface:
export type TMovieMethod = {
  // eslint-disable-next-line no-unused-vars
  createSlug(payload: TMovie): string;
};

// Create a new Model type that knows about IUserMethods...
export type TMovieModel = Model<TMovie, Record<string, unknown>, TMovieMethod>;
