import { ZodError, z } from "zod";
import { NextResponse } from "next/server";
import { currentUserId } from "./auth";

const seen = new Map<string, { count: number; reset: number }>();
export function rateLimit(id: string, max = 20, windowMs = 60_000) { const now = Date.now(), v = seen.get(id); if (!v || v.reset < now) { seen.set(id, { count: 1, reset: now + windowMs }); return true; } v.count++; return v.count <= max; }
export async function userOr401() { const userId = await currentUserId(); return userId ? { userId } : { response: NextResponse.json({ error: "Authentication required" }, { status: 401 }) }; }
export function apiError(error: unknown) { if (error instanceof ZodError) return NextResponse.json({ error: "Invalid input", details: z.treeifyError(error) }, { status: 422 }); if (error instanceof Error && error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Authentication required" }, { status: 401 }); return NextResponse.json({ error: "Unexpected server error" }, { status: 500 }); }
