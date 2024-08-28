import dotenv from "dotenv";
import connectDB from "./connectDB";
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  db_url: process.env.MONGO_URI,
  cors_origin: process.env.CORS_ORIGIN,
  salt_round: process.env.BCRYPT_JS_SALT_ROUNDS,
  access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  access_token_expiry: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refresh_token_expiry: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  connectDB,
};
