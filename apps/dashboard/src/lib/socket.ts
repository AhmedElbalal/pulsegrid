import { io } from "socket.io-client";

export const streamSocket = io("ws://127.0.0.1:3001/stream", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  timeout: 5000,
});

streamSocket.on("connect", () => {
  console.log("✅ Connected to PulseGrid stream");
});

streamSocket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});
