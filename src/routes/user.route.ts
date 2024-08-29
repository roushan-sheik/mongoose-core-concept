import { Router } from "express";
import { User_Role } from "../constant/user.constant";
import { userController } from "../controllers";
import { verifyAuth, zodValidateReq } from "../middlewares";
import { adminZodSchema, updateUserSchema } from "../validation";

const router = Router();

router
  .route("/create-admin")
  .post(
    zodValidateReq(adminZodSchema),
    verifyAuth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    userController.createAdmin
  );
router
  .route("/userId")
  .post(zodValidateReq(updateUserSchema), userController.updateUser);

export default router;
