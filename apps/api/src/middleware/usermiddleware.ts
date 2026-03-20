import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  if (!token) {
    res.json({
      message: "Enter token",
    });
    return;
  }
  const verified = jwt.verify(token!, process.env.JWT_SECRET!);
  // console.log("decrypted jwt token:", verified);
  if (verified) {
    req.userID = verified as string;
    next();
  } else {
    res.json({
      message: "unauthorized...",
    });
    return;
  }
};
