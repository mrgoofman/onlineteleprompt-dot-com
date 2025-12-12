import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json({
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 10)}...` : "MISSING",
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "SET (hidden)" : "MISSING",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET (hidden)" : "MISSING",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
    });
}
