import { TReview } from "../interfaces";
import { Movie } from "../models/movie.model";
import { Review } from "../models/review.model";

const createReview = async (
  slug: string,
  payload: Partial<TReview>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<TReview | any> => {
  //*1 start session
  const session = await Movie.startSession();
  try {
    //*2 start transaction 
    //*3 send session with operation
    session.startTransaction();
    // 1. find movie by slug and check if exists | > err
    const movie = await Movie.findOne({ slug });

    if (!movie) {
      throw new Error("Movie not found");
    }
    // 2. create review by movie id
    const review = await Review.create(
      [
        {
          movie: movie?._id,
          ...payload,
        },
      ],
      { session }
    );
    //3.  increase the total review count
    const reviewCount = await Review.countDocuments({
      movie: movie?._id,
    }).session(session);
    await Movie.updateOne({ slug }, { totalRating: reviewCount }).session(
      session
    );
    //*4 commit transaction
    await session.commitTransaction();
    //4. now return the review
    return review;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    await session.abortTransaction();
  }
  //*5 end session
  session.endSession();
};
export { createReview };
