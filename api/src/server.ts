// api/src/server.ts
import "dotenv/config";
import express, { type Express } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server as IOServer } from "socket.io";
import { initStreamNamespace, startSummarizer } from "./sockets/stream.js";

/**
 * Creates and configures the Express + Socket.IO server.
 */
export function createServer(): {
  app: Express;
  server: http.Server;
  io: IOServer;
} {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        process.env.CORS_ORIGIN ?? "http://localhost:5173",
        "http://127.0.0.1:5173",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  // Health check route
  app.get("/health", (_req, res) => res.json({ ok: true }));

  // ✅ Create HTTP server
  const server = http.createServer(app);

  // ✅ Create Socket.IO instance AFTER server is created
  const io = new IOServer(server, {
    cors: {
      origin: [
        process.env.CORS_ORIGIN ?? "http://localhost:5173",
        "http://127.0.0.1:5173",
      ],
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // ✅ Initialize Socket namespaces
  initStreamNamespace(io);
  startSummarizer(io);

  // ✅ Base socket event
  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);
    socket.on("disconnect", (reason) =>
      console.log(`❌ Socket ${socket.id} disconnected: ${reason}`)
    );
  });

  return { app, server, io };
}
