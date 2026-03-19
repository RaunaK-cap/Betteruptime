import type { Request, Response } from "express";

export const website = async (req: Request, res: Response) => {
  res.json({
    message: "end point is working",
  });
};
