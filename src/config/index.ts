import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  db_url: process.env.MONGO_URI,
};
