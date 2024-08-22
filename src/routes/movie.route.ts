import { Router } from "express";
import controllers from "../controllers";

const router = Router();
router.route("/movies").post(controllers.createMovie);

export default router;
