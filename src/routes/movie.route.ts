import { Router } from "express";
import controllers from "../controllers";

const router = Router();
router.route("/movies").post(controllers.createMovie);
router.route("/movies").get(controllers.getAllMovies);
router.route("/movies/:id").get(controllers.getMovieById);
router.route("/movies-by-slug/:slug").get(controllers.getMovieBySlug);

export default router;
