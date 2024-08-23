import { TReview } from "../interfaces";
import { Movie } from "../models/movie.model";
import { Review } from "../models/review.model";

const createReview = async (
  slug: string,
  payload: Partial<TReview>
): Promise<TReview> => {
  // 1. find movie by slug and check if exists | > err
  const movie = await Movie.findOne({ slug });

  if (!movie) {
    throw new Error("Movie not found");
  }
  // 2. create review by movie id
  const review = await Review.create({
    movie: movie?._id,
    ...payload,
  });
  //3.  increase the total review count
  const reviewCount = await Review.countDocuments({ movie: movie._id });
  await Movie.updateOne({ slug }, { totalRating: reviewCount });

  //4. now return the review
  return review;
};
export { createReview };
