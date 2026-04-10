import { prisma } from "db";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginschema, signupschema } from "../../types";

export const signup = async (req: Request, res: Response) => {
  const verifiedbody = signupschema.safeParse(req.body);
  if (!verifiedbody.success) {
    res.status(400).json({
      message: "Invalid signup data",
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
    console.log(result);
    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while signing up, please try again",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const verifiedbody = loginschema.safeParse(req.body);
  if (!verifiedbody.success) {
    res.status(401).json({
      message: "Invalid login credentials",
    });
    return;
  }
  const hashedPassword = Bun.hash(verifiedbody.data.password);

  try {
    const result: any = await prisma.users.findFirst({
      where: {
        username: verifiedbody.data.username,
        password: hashedPassword.toString(),
      },
    });

    if (!result) {
      res.status(404).json({
        message: "No user found, signup first",
      });
    } else {
      const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET!);
      res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          id: result.id,
          username: result.username,
          firstname: result.firstname,
          lastname: result.lastname,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error while logging in",
    });
  }
};
