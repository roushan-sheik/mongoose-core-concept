import { Router } from "express";
import { userController } from "../controllers";
import { zodValidateReq } from "../middlewares";
import { adminZodSchema, updateUserSchema } from "../validation";

const router = Router();

router
  .route("/create-admin")
  .post(zodValidateReq(adminZodSchema), userController.createAdmin);
router
  .route("/userId")
  .post(zodValidateReq(updateUserSchema), userController.updateUser);

export default router;
