import dotenv from "dotenv";
import connectDB from "./connectDB";
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  db_url: process.env.MONGO_URI,
  cors_origin: process.env.CORS_ORIGIN,
  connectDB,
};
