import { ZodError } from "zod";

const handleZodError = (err: ZodError) => {
  const handledError = err.issues.map((error) => {
    return {
      path: error.path[error.path.length - 1],
      message: error.message,
    };
  });
  return handledError;
};
export { handleZodError };
