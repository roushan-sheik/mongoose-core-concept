import { TUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

const createAdminIntoDB = async (payload: TUser) => {
  const createdAdmin = await User.create(payload);
  return createdAdmin;
};
export const userService = { createAdminIntoDB };
