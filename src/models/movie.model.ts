import { format } from "date-fns";
import { model, Schema } from "mongoose";
import slugify from "slugify";
import { TMovie, TMovieMethod, TMovieModel } from "../interfaces";

// main movie schema
const movieSchema = new Schema<TMovie, TMovieModel, TMovieMethod>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date },
  genre: { type: String, required: [true, "genre is required"] },
  isDeleted: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  slug: String,
  totalRating: { type: Number, default: 0 },
});

// make a slug by date and title before save in to the database
// movieSchema.pre("save", function (next) {
//   const date = format(this.releaseDate, "MM/dd/yyyy");
//   this.slug = slugify(`${this.title}-${date}`, { lower: true });
//   next();
// });
//* make a slug by creating instance method
movieSchema.method("createSlug", function createSlug(payload: TMovie) {
  const date = format(payload.releaseDate, "MM/dd/yyyy");
  return slugify(`${payload.title}-${date}`, { lower: true });
});

export const Movie = model<TMovie, TMovieModel>("Movie", movieSchema);
