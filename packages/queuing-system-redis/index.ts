import { prisma } from "db";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient().on("error", (err) =>
  console.log("Redis Client Error", err),
);

const STREAM_NAME = process.env.STREAM_NAME!;

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
