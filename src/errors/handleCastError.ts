import mongoose from "mongoose";
import { TErrorSources } from "../interfaces";

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return errorSources;
};

export default handleCastError;
