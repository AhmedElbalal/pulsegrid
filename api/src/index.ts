import dotenv from "dotenv";
dotenv.config();

import { createServer } from "./server.js";
import { prisma } from "./prisma.js";

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || "0.0.0.0";

async function main() {
  try {
    const { server } = createServer();
    const PORT = Number(process.env.PORT || 3001); // Convert to number
    server.listen(PORT, HOST, () => // Use the HOST constant and ensure PORT is number
      console.log(`🚀 API listening on http://${HOST}:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
}

main();