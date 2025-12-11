import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MockD1Database } from "@/lib/mock-db";

// Cloudflare D1 Type Definition
interface D1Database {
    prepare: (query: string) => D1PreparedStatement;
}

interface D1PreparedStatement {
    bind: (...values: any[]) => D1PreparedStatement;
    run: <T = unknown>() => Promise<D1Result<T>>;
    all: <T = unknown>() => Promise<D1Result<T>>;
}

interface D1Result<T = unknown> {
    results: T[];
    success: boolean;
    error?: string;
    meta: any;
}

// export const runtime = "edge"; // REMOVED for mocked local dev
export const dynamic = "force-dynamic";

function getDB() {
    if (process.env.DB) return process.env.DB as unknown as D1Database;
    // Fallback to mock DB for local development
    return new MockD1Database() as unknown as D1Database;
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const db = getDB();
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
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, url } = await req.json();

    try {
        const db = getDB();
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
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const db = getDB();
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
