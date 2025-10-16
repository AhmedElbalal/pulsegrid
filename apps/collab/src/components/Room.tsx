import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const SOCKET = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

export default function Room() {
  const [log, setLog] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [userId] = useState(() => Math.random().toString(36).slice(2));
  const [reportId] = useState("demo-report");

  useEffect(() => {
    const s = io(`${SOCKET}/collab`, { query: { userId, reportId } });
    s.on("presence", (e: any) => setLog((l) => [`${e.userId} ${e.status}`, ...l]));
    s.on("typing", (e: any) => setLog((l) => [`${e.userId} typing…`, ...l]));
    s.on("message", (e: any) => setLog((l) => [`${e.userId}: ${e.msg}`, ...l]));
    return () => s.disconnect();
  }, [userId, reportId]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="message" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={() => {
          const s = io(`${SOCKET}/collab`, { query: { userId, reportId } });
          s.emit("typing");
          s.emit("message", msg);
          s.disconnect();
          setMsg("");
        }}>Send</button>
      </div>
      <ul>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>
    </div>
  );
}
