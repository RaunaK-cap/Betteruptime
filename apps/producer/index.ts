import { createClient } from "redis";

const main = async () => {
  const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  console.log("redis connected");
  client.destroy();
};

main();
