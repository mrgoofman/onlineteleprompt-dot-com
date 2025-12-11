import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGoogleDocContent } from "@/lib/google";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const docId = searchParams.get("id");

    if (!docId) {
        return NextResponse.json({ error: "Missing doc ID" }, { status: 400 });
    }

    try {
        const data = await getGoogleDocContent(docId, session.accessToken);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch doc:", error);

        // Fallback for development/expired tokens to allow UI testing
        // This prevents the "500" blocker when the user just wants to see the prompter
        console.warn("Falling back to MOCK data due to API error.");
        return NextResponse.json({
            title: "Mock Script (Auth Expired)",
            text: "This is a placeholder script because the Google Access Token has expired or is invalid.\n\nTo see your real Google Doc, please Sign Out and Sign In again.\n\nIn the meantime, you can test the teleprompter speed and settings with this text.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        });
    }
}
