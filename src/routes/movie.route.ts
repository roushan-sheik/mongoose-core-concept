import { Router } from "express";
import { movieController } from "../controllers";
import { zodValidateReq } from "../middlewares";
import { movieZodSchema } from "../validation";

const router = Router();
router
  .route("/")
  .post(zodValidateReq(movieZodSchema), movieController.createMovie);
router.route("").get(movieController.getAllMovies);
router.route("/:id").get(movieController.getMovieById);
router.route("/by-slug/:slug").get(movieController.getMovieBySlug);

export default router;
