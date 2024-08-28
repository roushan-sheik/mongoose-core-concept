import { TUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

const createAdminIntoDB = async (payload: TUser) => {
  const createdAdmin = await User.create(payload);
  return createdAdmin;
};
// update user
const updateUserInDB = async (_id: string, payload: TUser) => {
  const updatedResult = await User.findByIdAndUpdate({ _id }, payload);
  return updatedResult;
};
export const userService = { createAdminIntoDB, updateUserInDB };
