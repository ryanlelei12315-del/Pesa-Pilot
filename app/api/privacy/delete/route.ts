import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "../../../../lib/db";
import { endSession } from "../../../../lib/auth";
import { apiError, userOr401 } from "../../../../lib/http";
export async function POST(req: NextRequest) { try { const auth = await userOr401(); if ("response" in auth) return auth.response; z.object({ confirmation: z.literal("DELETE MY ACCOUNT") }).parse(await req.json()); await db.user.delete({ where: { id: auth.userId } }); await endSession(); return NextResponse.json({ ok: true }); } catch (error) { return apiError(error); } }
