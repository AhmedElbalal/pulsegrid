import "dotenv/config";
import fetch from "node-fetch";

const API = process.env.API_URL || "http://localhost:3001";
async function tick() {
  const now = new Date().toISOString();
  const body = [
    { ts: now, userId: "sim-1", type: "click" },
    { ts: now, userId: "sim-2", type: "view" }
  ];
  await fetch(`${API}/api/events`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  console.log("pushed 2 events");
}
setInterval(tick, 2000);
