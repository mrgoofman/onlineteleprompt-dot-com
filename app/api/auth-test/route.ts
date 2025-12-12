import { NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google";
import * as crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
    const results: Record<string, unknown> = {
        step: "starting",
        env: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...` : "MISSING",
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "SET" : "MISSING",
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "MISSING",
            NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
        }
    };

    try {
        // Test crypto functions that NextAuth uses
        results.step = "testing crypto.randomBytes";
        const randomBytes = crypto.randomBytes(32);
        results.randomBytesOk = randomBytes.length === 32;

        results.step = "testing crypto.createHash";
        const hash = crypto.createHash("sha256").update("test").digest("hex");
        results.hashOk = hash.length === 64;

        results.step = "testing crypto.randomUUID";
        const uuid = crypto.randomUUID();
        results.uuidOk = uuid.length === 36;

        results.step = "creating provider";
        const provider = GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        });

        results.step = "provider created";
        results.providerId = provider.id;
        results.providerName = provider.name;
        results.providerType = provider.type;

        results.step = "complete";
        results.success = true;

    } catch (error) {
        results.success = false;
        results.error = error instanceof Error ? error.message : String(error);
        results.errorStack = error instanceof Error ? error.stack : undefined;
    }

    return NextResponse.json(results, { status: results.success ? 200 : 500 });
}
