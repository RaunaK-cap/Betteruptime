import { prisma } from "db";
import { Xreadgroups, XackBulk } from "queuing-system-redis";
import dotenv from "dotenv";

dotenv.config();

const REGION_ID = process.env.REGION_ID!;
const WORKING_ID = process.env.WORKING_ID!;

if (!REGION_ID) {
  throw new Error("regionID is not available");
}

if (!WORKING_ID) {
  throw new Error("workingID is not available");
}

async function main() {
  while (true) {
    const responses = await Xreadgroups(REGION_ID, WORKING_ID);

    if (!responses) {
      continue;
    }
    // gotta check type schema here ////
    const promises = responses?.map((msg) =>
      fetchwebsite(msg.message.url, msg.message.id),
    );
    //@ts-ignore
    await Promise.all(promises);
    console.log(promises.length);

    //@ts-ignore
    XackBulk(
      REGION_ID,
      //@ts-ignore
      responses?.map((id) => id),
    );
  }
}

async function fetchwebsite(url: string, websiteId: string) {
  return new Promise<void>((resolve, reject) => {
    const starttime = Date.now();

    fetch(url)
      .then(async () => {
        const endtime = Date.now();
        await prisma.websiteTick.create({
          data: {
            Status: "up",
            Response_time_ms: endtime - starttime,
            region_id: Number(REGION_ID),
            website_id: Number(websiteId),
          },
        });

        resolve();
      })
      .catch(async () => {
        const endtime = Date.now();
        await prisma.websiteTick.create({
          data: {
            Status: "down",
            Response_time_ms: endtime - starttime,
            region_id: Number(REGION_ID),
            website_id: Number(websiteId),
          },
        });

        resolve();
      });
  });
}
