import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSession } from "../../../../lib/auth";
import { db } from "../../../../lib/db";
import { apiError, rateLimit } from "../../../../lib/http";
export async function POST(req: NextRequest) { try { const ip = req.headers.get("x-forwarded-for") ?? "local"; if (!rateLimit(`register:${ip}`, 5)) return NextResponse.json({ error: "Too many attempts" }, { status: 429 }); const body = z.object({ name: z.string().trim().min(1).max(80), email: z.string().email().max(254), password: z.string().min(12).max(128) }).parse(await req.json()); const email = body.email.toLowerCase(); if (await db.user.findUnique({ where: { email } })) return NextResponse.json({ error: "Email already registered" }, { status: 409 }); const user = await db.user.create({ data: { name: body.name, email, password: await bcrypt.hash(body.password, 12), notificationPreference: { create: {} } } }); await db.auditLog.create({ data: { action: "REGISTER", entityType: "User", entityId: user.id, changes: "{}", ipAddress: ip } }); await createSession(user.id); return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 }); } catch (error) { return apiError(error); } }
