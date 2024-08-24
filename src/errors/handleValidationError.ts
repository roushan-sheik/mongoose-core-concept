import mongoose from "mongoose";
//* note MongoDB Gives us 2 kinds of errors ========================>
// 1. missing data => ValidatorError
// 2. WRONG Type => CastError

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );
  return errorSources;
};
export default handleValidationError;
