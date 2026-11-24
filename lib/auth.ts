import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { db } from "./db";

const COOKIE = "pesapilot_session";
const hash = (value: string) => createHash("sha256").update(value).digest("hex");

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await db.session.create({ data: { userId, tokenHash: hash(token), expiresAt } });
  const jar = await cookies();
  jar.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires: expiresAt });
}

export async function currentUserId() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = await db.session.findUnique({ where: { tokenHash: hash(token) }, select: { userId: true, expiresAt: true } });
  if (!session || session.expiresAt <= new Date()) return null;
  return session.userId;
}

export async function requireUserId() { const id = await currentUserId(); if (!id) throw new Error("UNAUTHORIZED"); return id; }
export async function endSession() { const jar = await cookies(); const token = jar.get(COOKIE)?.value; if (token) await db.session.deleteMany({ where: { tokenHash: hash(token) } }); jar.delete(COOKIE); }
