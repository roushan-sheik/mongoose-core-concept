import bcryptjs from "bcryptjs";
import { model, Schema } from "mongoose";
import config from "../config";
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
// hash the user password before save user into db
userSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, Number(config.salt_round));
  next();
});

export const User = model<TUser>("User", userSchema);
// auth route for public app 
// api/auth/login
// api/auth/register
// api/auth/forgot-password
// api/auth/refresh-token
