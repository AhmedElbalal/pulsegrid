import { Router } from "express";
import { prisma } from "../prisma.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signToken } from "../auth.js";

export const auth = Router();

const cred = z.object({ email: z.string().email(), password: z.string().min(6) });

auth.post("/auth/signup", async (req, res) => {
  const parsed = cred.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "bad input" });
  const { email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ error: "exists" });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash } });
  const token = signToken({ id: user.id, email: user.email });
  res.json({ token, user: { id: user.id, email: user.email } });
});

auth.post("/auth/login", async (req, res) => {
  const parsed = cred.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "bad input" });
  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "invalid" });
  const token = signToken({ id: user.id, email: user.email });
  res.json({ token, user: { id: user.id, email: user.email } });
});
