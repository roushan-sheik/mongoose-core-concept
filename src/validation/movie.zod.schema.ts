import { z } from "zod";

const movieZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  releaseDate: z
    .string()
    .date("Please provide a valid date in this format YYYY-MM-DD"),
  genre: z.string(),
  isDeleted: z.boolean().optional(),
});
export default movieZodSchema;
