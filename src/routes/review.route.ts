import { Router } from "express";
import controllers from "../controllers";

const router = Router();

router.get("/:slug/review", controllers.getAllReviews);
router.post("/:slug/review", controllers.createReview);

export default router;
