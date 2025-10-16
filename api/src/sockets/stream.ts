import { Server as SocketIOServer, Namespace } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { Server as HttpServer } from "http";

// Define a custom interface for your namespace if needed
interface StreamNamespace extends Namespace {
  // Add any custom methods or properties here if needed
}

export function initStreamNamespace(io: SocketIOServer): StreamNamespace {
  const streamNamespace = io.of("/stream") as StreamNamespace;

  streamNamespace.on("connection", (socket) => {
    console.log(`⚡ Client connected to /stream: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`⚡ Client disconnected: ${socket.id}`);
    });
  });

  return streamNamespace;
}

const prisma = new PrismaClient();

export function startSummarizer(io: SocketIOServer): void {
  console.log("⚙️  Summarizer started...");

  setInterval(async () => {
    try {
      const activeUsers = await prisma.event.findMany({
        select: { userId: true },
        distinct: ["userId"],
      });

      const topEventTypes = await prisma.event.groupBy({
        by: ["type"],
        _count: { type: true },
        orderBy: {
          _count: { type: "desc" },
        },
        take: 3,
      });

      const summary = {
        activeUsers: activeUsers.length,
        topEventTypes,
      };

      io.of("/stream").emit("summary", summary);
      console.log("📡 Broadcast summary:", summary);
    } catch (err) {
      console.error("❌ Summarizer tick error:", err);
    }
  }, 10000);
}