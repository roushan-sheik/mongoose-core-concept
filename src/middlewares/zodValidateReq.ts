import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { asyncHandler } from "../utils";

const zodValidateReq = (schema: AnyZodObject) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync(req.body);
      next();
    }
  );
};

export default zodValidateReq;
