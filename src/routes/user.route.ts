//  /create-admin   POST
//  /:userId- admin, superadmin  PUT
// /me - user won data PUT
import { Router } from "express";
import { userController } from "../controllers";
import { zodValidateReq } from "../middlewares";
import { adminZodSchema } from "../validation";

const router = Router();

router
  .route("/create-admin")
  .post(zodValidateReq(adminZodSchema), userController.createAdmin);

export default router;
