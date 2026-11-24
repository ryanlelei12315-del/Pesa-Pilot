import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { userOr401 } from "../../../lib/http";
export async function GET() { const auth = await userOr401(); if ("response" in auth) return auth.response; const user = await db.user.findUnique({ where: { id: auth.userId }, select: { id: true, name: true, email: true, notificationPreference: true } }); return NextResponse.json(user); }
