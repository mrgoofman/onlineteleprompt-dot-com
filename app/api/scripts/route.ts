import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB, D1Database } from "@/lib/db";

export const dynamic = "force-dynamic";

// Helper to get D1 from Cloudflare context, with fallback for local dev
function getCloudflareDB(): D1Database {
    try {
        const { env } = getCloudflareContext();
        if (env.DB) {
            return env.DB;
        }
    } catch {
        // getCloudflareContext() throws when not in Cloudflare Workers
    }
    // Fallback to in-memory database for local development
    return getDB();
}

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const db = getCloudflareDB();
        const { results } = await db.prepare(
            "SELECT * FROM scripts WHERE user_email = ? ORDER BY created_at DESC"
        )
            .bind(session.user.email)
            .all();

        return NextResponse.json(results);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, url } = await req.json() as { id: string; title: string; url: string };

    try {
        const db = getCloudflareDB();
        await db.prepare(
            "INSERT INTO scripts (id, user_email, title, url, created_at) VALUES (?, ?, ?, ?, ?)"
        )
            .bind(id, session.user.email, title, url, Date.now())
            .run();

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const db = getCloudflareDB();
        await db.prepare(
            "DELETE FROM scripts WHERE id = ? AND user_email = ?"
        )
            .bind(id, session.user.email)
            .run();

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
