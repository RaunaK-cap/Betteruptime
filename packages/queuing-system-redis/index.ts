import { prisma } from "db";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient().on("error", (err) =>
  console.log("Redis Client Error", err),
);

const main = async () => {
  const websitedata: { url: string; id: number }[] =
    await prisma.website.findMany({
      select: {
        url: true,
        id: true,
      },
    });

  const pipeline = client.MULTI();

  websitedata.forEach((data) => {
    pipeline.xAdd(
      "betteruptime:websitedata",
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

const start = async () => {
  await client.connect();
  console.log("Redis connected");

  // run immediately then every 4 seconds
  await main();
  client.destroy();
};

start();
