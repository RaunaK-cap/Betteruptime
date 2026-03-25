import { prisma } from "db";
import { createClient } from "redis";
import dotend from "dotenv";

dotend.config();

const main = async () => {
  const websitedata: { url: string; id: number }[] =
    await prisma.website.findMany();

  const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  console.log("streams started");

  const pipeline = client.MULTI();
  websitedata.map((data) => {
    pipeline.xAdd("betteruptime:websitedata", "*", {
      website: data.url,
      id: data.id.toString(),
    });
  });

  const results = await pipeline.EXEC();
  console.log("Generated stream entry IDs:", results);

  client.destroy();
};

setInterval(main, 4000);
