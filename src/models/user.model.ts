import { model, Schema } from "mongoose";
import { User_Role, User_Status } from "../constant/user.constant";
import { TUser } from "../interfaces/user.interface";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: Object.keys(User_Role),
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: 0,
  },
  status: {
    type: String,
    enum: Object.keys(User_Status),
    default: User_Status.ACTIVE,
  },
  passwordChangedAt: {
    type: Date,
  },
});

export const User = model<TUser>("User", userSchema);
