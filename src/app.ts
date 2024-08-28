import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
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
// home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Movie Home Route" });
});

// route import
import routes from "./routes";
app.use("/api/v1/movies", routes.movieRoute);
app.use("/api/v1/reviews", routes.reviewRoute);
app.use("/api/v1/users", routes.userRoute);
app.use("/api/v1/auth", routes.authRoute);

// global error handler and not found middleware
import { handleGlobalError, notFound } from "./middlewares";
app.use(notFound);
app.use(handleGlobalError);

export { app };
