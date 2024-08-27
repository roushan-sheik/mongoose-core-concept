import { z } from "zod";
import { User_Role, User_Status } from "../constant/user.constant";

export const adminZodSchema = z.object({
  name: z.string(),
  role: z.nativeEnum(User_Role).default(User_Role.ADMIN),
  email: z.string().email(),
  password: z.string(),
  status: z.nativeEnum(User_Status).default(User_Status.ACTIVE),
  passwordChangedAt: z.string().optional(),
});
