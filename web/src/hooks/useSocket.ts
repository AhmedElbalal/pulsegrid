// web/src/hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

let singleton: Socket | null = null;

export function useSocket() {
  const socketRef = useRef<Socket | null>(singleton);

  useEffect(() => {
    if (!socketRef.current) {
      // Prefer env, fallback to local API
      const url = import.meta.env.VITE_SOCKET_URL ?? "http://127.0.0.1:3001/stream";

      socketRef.current = io(url, {
        path: "/socket.io/",
        transports: ["websocket", "polling"],
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        timeout: 20000,
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        console.log("⚡ Connected to PulseGrid stream");
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("❌ Disconnected:", reason);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return socketRef.current;
}
