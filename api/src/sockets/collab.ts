import type { Server } from "socket.io";
export function initCollabNamespace(io: Server) {
  const nsp = io.of("/collab");
  nsp.on("connection", (socket) => {
    const { reportId, userId } = socket.handshake.query as Record<string, string>;
    if (!reportId || !userId) return socket.disconnect();

    socket.join(reportId);
    socket.to(reportId).emit("presence", { userId, status: "online" });

    socket.on("typing", () => socket.to(reportId).emit("typing", { userId }));
    socket.on("message", (msg: string) => nsp.to(reportId).emit("message", { userId, msg }));

    socket.on("disconnect", () =>
      socket.to(reportId).emit("presence", { userId, status: "offline" }),
    );
  });
}
