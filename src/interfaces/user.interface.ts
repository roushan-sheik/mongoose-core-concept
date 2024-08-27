import { User_Role, User_Status } from "../constant/user.constant";

export type TUser = {
  name: string;
  role: keyof typeof User_Role;
  email: string;
  password: string;
  status: keyof typeof User_Status;
  passwordChangedAt?: Date;
};
