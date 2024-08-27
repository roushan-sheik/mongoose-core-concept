//  /create-admin   POST
//  /:userId- admin, superadmin  PUT
// /me - user won data PUT
import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.route("/create-admin").post(userController.createAdmin);

export default router;
