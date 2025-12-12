import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

    return NextResponse.json({
        GOOGLE_CLIENT_ID: clientId ? `${clientId.substring(0, 10)}...` : "MISSING",
        GOOGLE_CLIENT_ID_LENGTH: clientId.length,
        GOOGLE_CLIENT_ID_ENDS_WITH: clientId ? clientId.substring(clientId.length - 20) : "N/A",
        GOOGLE_CLIENT_SECRET: clientSecret ? "SET (hidden)" : "MISSING",
        GOOGLE_CLIENT_SECRET_LENGTH: clientSecret.length,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET (hidden)" : "MISSING",
        NEXTAUTH_SECRET_LENGTH: (process.env.NEXTAUTH_SECRET || "").length,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
    });
}
