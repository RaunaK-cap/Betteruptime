import type { Request, Response } from "express";
import { website_content } from "../../types";
import { prisma } from "db";

export const website = async (req: Request, res: Response) => {
  const verifiedbody = website_content.safeParse(req.body);
  if (!verifiedbody.success) {
    res.status(400).json({
      message: "enter a valid data",
    });
  }
  const UserID = req.userID!;
  const URL = verifiedbody.data?.url;
  try {
    const result = await prisma.website.create({
      data: {
        url: URL as string,
        User_ID: Number(UserID),
      },
    });

    res.status(201).json({
      message: "website data have been stored successfully.. ",
      websiteID: result.id,
    });
  } catch (error) {
    res.status(501).json({
      message: "failed to store data.",
    });
  }
};

export const getwebsite = async (req: Request, res: Response) => {
  const websiteID = req.params.websiteID;
  try {
    const websitedata = await prisma.website.findFirst({
      where: {
        User_ID: Number(req.userID),
        id: Number(websiteID),
      },
      include: {
        ticks: {
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: 1,
        },
      },
    });

    res.status(200).json({
      websitedata: websitedata,
    });
  } catch (e) {
    res.status(500).json({
      message: "failed to fetch website data.",
    });
  }
};

export const deletewebsite = async (req: Request, res: Response) => {
  const { websiteID } = req.body;

  try {
    const Resp = await prisma.website.delete({
      where: {
        id: Number(websiteID),
        User_ID: Number(req.userID!),
      },
      include: {
        ticks: true,
      },
    });

    res.status(200).json({
      message: "websitedata has been deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "error while deleting ",
    });
  }
};
