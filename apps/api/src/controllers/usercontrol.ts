import { prisma } from "db";
import type { Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import z from "zod";

export const signup = async (req: Request, res: Response) => {
  if (!req.body) {
    res.json({
      message: "please enter data ",
    });
  }

  const signupschema = z.object({
    username: z.string(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
  });

  const verifiedbody = signupschema.safeParse(req.body);
  if (!verifiedbody.success) {
    res.json({
      message: "invalid data",
    });
    return;
  }
  const hashedPassword = Bun.hash(verifiedbody.data.password);

  try {
    const result = await prisma.users.upsert({
      where: {
        username: verifiedbody.data.username,
      },

      create: {
        firstname: verifiedbody.data.firstname,
        lastname: verifiedbody.data.lastname,
        username: verifiedbody.data.username,
        password: hashedPassword.toString(),
      },
      update: {
        firstname: verifiedbody.data.firstname,
        lastname: verifiedbody.data.lastname,
        username: verifiedbody.data.username,
        password: hashedPassword.toString(),
      },
    });

    res.status(201).json({
      message: "signup successsfull",
    });
  } catch (error) {
    res.status(411).json({
      message: "errror while signup , please try again ",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(401).json({
      message: "please enter login credentials",
    });
  }

  const loginschema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const verifiedbody = loginschema.safeParse(req.body);

  if (!verifiedbody.success) {
    res.status(401).json({
      message: "Invalid login credentials",
    });
    return;
  }
  const hashedPassword = Bun.hash(verifiedbody.data.password);

  interface resulttypes {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    // createdAt: number
    // updatedAt: number
  }
  try {
    const result = await prisma.users.findFirst({
      where: {
        username: verifiedbody.data.username,
        password: hashedPassword.toString(),
      },
    });

    if (!result) {
      const token = jwt.sign(result?.id, process.env.JWT_SECRET!);
      res.status(201).json({
        message: "login successfull",
        token: token,
        result: result?.id,
      });
    } else {
      res.status(401).json({
        message: "Invalid login credentials",
      });
    }
  } catch (error) {
    res.status(501).json({
      message: "No data found, signup first",
    });
  }
};
