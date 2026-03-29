import { prisma } from "db";
import { createClient } from "redis";
import dotenv from "dotenv";
import { isConstructSignatureDeclaration } from "typescript";

dotenv.config();

const client = createClient().on("error", (err) =>
  console.log("Redis Client Error", err),
);

const STREAM_NAME = process.env.STREAM_NAME!;

type messageType = {
  id: string;
  message: {
    url: string;
    id: string;
  };
  //@ts-ignore
};

export const xaddbulk = async (websitedata: { url: string; id: number }[]) => {
  await client.connect();
  const pipeline = client.MULTI();

  websitedata.forEach((data) => {
    pipeline.xAdd(
      "STREAM_NAME",
      "*",
      {
        website: data.url,
        id: data.id.toString(),
      },
      {
        TRIM: {
          strategy: "MAXLEN",
          strategyModifier: "~",
          threshold: 50,
        },
      },
    );
  });

  const results = await pipeline.EXEC();
  console.log(
    `[${new Date().toISOString()}] Added ${results?.length} entries:`,
    results,
  );
};

//@ts-ignore
export const Xreadgroups = async (
  consumergroup: string,
  workingId: string,
): Promise<messageType[] | undefined> => {
  const res = await client.xReadGroup(
    consumergroup,
    workingId,
    {
      key: STREAM_NAME,
      id: ">",
    },
    {
      COUNT: 5,
    },
  );

  //@ts-ignore
  const message = res?.[0]?.message;
  return message;
};

export const Xack = async (consumergroup: string, eventID: string) => {
  await client.xAck(STREAM_NAME, consumergroup, eventID);
};

export const XackBulk = async (
  consumergroup: string,
  eventID: string,
  eventIDs: string[],
) => {
  eventIDs.forEach((data) => {
    Xack(consumergroup, eventID);
  });
};
