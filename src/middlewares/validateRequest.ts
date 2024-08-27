import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { asyncHandler } from "../utils";

const zodValidateReq = (schema: AnyZodObject) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      next();
    }
  );
};

export default zodValidateReq;
