import express from "express";
import { authController } from "../controllers/auth.controller";

const router = express.Router();
router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser)

export default router;
