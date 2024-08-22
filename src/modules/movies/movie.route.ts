import { Request, Response, Router } from "express";

const router = Router();
router.route("/movies").post((req: Request, res: Response) => {
  res.status(201).json({ data: req.body });
});

export default router;
