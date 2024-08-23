import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import config from "./config";

const app = express();
// cors options
const options = {
  origin: config.cors_origin,
  credentials: true,
};
// middlewares
app.use(express.json({ limit: "16kb" }));
app.use(cors(options));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// route import
import routes from "./routes";
app.use("/api/v1", routes.movieRoute);
app.use("/api/v1/movies", routes.reviewRoute);

// global error handler middleware
import { handleGlobalError } from "./middlewares";
app.use(handleGlobalError);

export { app };
