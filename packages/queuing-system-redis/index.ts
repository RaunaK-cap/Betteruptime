import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient().on("error", (err) =>
  console.log("Redis Client Error", err),
);
await client.connect();

const STREAM_NAME = process.env.STREAM_NAME!;
if (!STREAM_NAME) {
  throw new Error("STREAM_NAME is not available");
}

type messageType = {
  id: string;
  message: {
    url: string;
    id: string;
  };
  //@ts-ignore
};

export async function xaddbulk(websitedata: { url: string; id: number }[]) {
  const pipeline = client.MULTI();

  websitedata.forEach((data) => {
    pipeline.xAdd(
      STREAM_NAME,
      "*",
      {
        url: data.url,
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
}

export async function ensureConsumerGroup(consumergroup: string) {
  try {
    await client.xGroupCreate(STREAM_NAME, consumergroup, "0", {
      MKSTREAM: true,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("BUSYGROUP")) {
      return;
    }

    throw error;
  }
}

//@ts-ignore
export async function Xreadgroups(
  consumergroup: string,
  workingId: string,
): Promise<messageType[] | undefined> {
  const res = await client.xReadGroup(
    consumergroup,
    workingId,
    {
      key: STREAM_NAME,
      id: ">",
    },
    {
      COUNT: 5,
      BLOCK: 5000,
    },
  );

  //@ts-ignore
  const message = res?.[0]?.messages;
  return message;
}

export async function Xack(consumergroup: string, eventID: string) {
  await client.xAck(STREAM_NAME, consumergroup, eventID);
}

export async function XackBulk(consumergroup: string, eventIDs: string[]) {
  await Promise.all(eventIDs.map((eventID) => Xack(consumergroup, eventID)));
}
