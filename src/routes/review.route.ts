import { Router } from "express";
import { reviewController } from "../controllers";

const router = Router();

router.get("/:slug/review", reviewController.getAllReviews);
router.post("/:slug/review", reviewController.createReview);

export default router;
