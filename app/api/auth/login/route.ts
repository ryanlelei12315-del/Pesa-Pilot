import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSession } from "../../../../lib/auth";
import { db } from "../../../../lib/db";
import { apiError, rateLimit } from "../../../../lib/http";
export async function POST(req: NextRequest) { try { const ip = req.headers.get("x-forwarded-for") ?? "local"; if (!rateLimit(`login:${ip}`, 8)) return NextResponse.json({ error: "Too many attempts" }, { status: 429 }); const input = z.object({ email: z.string().email(), password: z.string().min(1).max(128) }).parse(await req.json()); const user = await db.user.findUnique({ where: { email: input.email.toLowerCase() } }); if (!user || !await bcrypt.compare(input.password, user.password)) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 }); await createSession(user.id); await db.auditLog.create({ data: { action: "LOGIN", entityType: "User", entityId: user.id, changes: "{}", ipAddress: ip } }); return NextResponse.json({ id: user.id, name: user.name, email: user.email }); } catch (error) { return apiError(error); } }
