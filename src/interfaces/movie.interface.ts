export type TReview = {
  email: string;
  rating: number;
  comment: string;
};

export type TMovie = {
  title: string;
  description: string;
  releaseDate: Date; // or Date if you're working with Date objects
  genre: string;
  isDeleted: boolean;
  viewCount: number;
  slug: string;
  reviews: [TReview];
};
