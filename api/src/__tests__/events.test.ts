import request from "supertest";
import { createServer } from "../server.js";

const { app } = createServer();

test("POST /api/events happy path", async () => {
  const body = [
    { ts: new Date().toISOString(), userId: "u1", type: "click", props: { x: 1 } },
    { ts: new Date().toISOString(), userId: "u2", type: "view" }
  ];
  const res = await request(app).post("/api/events").send(body);
  expect(res.status).toBe(200);
  expect(res.body.inserted).toBe(2);
});
