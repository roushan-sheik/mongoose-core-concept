import { Router } from "express";
import { movieController } from "../controllers";
import { validateZodMovieReq } from "../middlewares";
import { movieZodSchema } from "../validation";

const router = Router();
router
  .route("/movies")
  .post(validateZodMovieReq(movieZodSchema), movieController.createMovie);
router.route("/movies").get(movieController.getAllMovies);
router.route("/movies/:id").get(movieController.getMovieById);
router.route("/movies-by-slug/:slug").get(movieController.getMovieBySlug);

export default router;
