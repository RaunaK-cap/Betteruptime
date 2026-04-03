import { prisma } from "db";
import { xaddbulk } from "queuing-system-redis";

async function main() {
  const websitedata = await prisma.website.findMany({
    select: {
      url: true,
      id: true,
    },
  });

  await xaddbulk(websitedata.map((w) => ({ url: w.url, id: w.id })));
}

main();
setInterval(
  () => {
    main();
  },
  1000 * 3 * 60,
);
