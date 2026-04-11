import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface VerifiedSchema extends JwtPayload {
  userId: string;
}

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
  const verified = jwt.verify(
    token!,
    process.env.JWT_SECRET!,
  ) as VerifiedSchema;
  // console.log("decrypted jwt token:", verified);
  if (verified) {
    req.userID = verified.userId;
    next();
  } else {
    res.json({
      message: "unauthorized...",
    });
    return;
  }
};
