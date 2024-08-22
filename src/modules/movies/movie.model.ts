import { model, Schema } from "mongoose";
import { TMovie, TReview } from "./movie.interface";

// sub schema
const reviewSchema = new Schema<TReview>({
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});
// main movie schema
const movieSchema = new Schema<TMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date },
  genre: { type: String, required: [true, "genre is required"] },
  isDeleted: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  reviews: reviewSchema,
});

export const Movie = model<TMovie>("Movie", movieSchema);
