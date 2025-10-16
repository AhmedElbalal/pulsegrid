import request from "supertest";
import { createServer } from "../server.js";

const { app } = createServer();

test("health", async () => {
  const res = await request(app).get("/api/health");
  expect(res.status).toBe(200);
  expect(res.body.ok).toBe(true);
});
