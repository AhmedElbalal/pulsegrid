import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@pulsegrid.dev" },
    update: {},
    create: { email: "demo@pulsegrid.dev", password: "$2a$10$6qf3m2j7w0q2vZp1n1rKQeZVQw4m9J0Y3iNDzv1V9r1K3dXWrxo7G" }
  });
  const now = Date.now();
  const batch = Array.from({ length: 200 }, (_, i) => ({
    ts: new Date(now - i * 15000),
    userId: user.id,
    type: i % 3 === 0 ? "click" : "view",
    props: { n: i }
  }));
  await prisma.event.createMany({ data: batch });
  console.log("Seed done.");
}
main().finally(() => prisma.$disconnect());
