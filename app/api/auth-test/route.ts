import { NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google";
import * as crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";

export const dynamic = "force-dynamic";

async function testCrypto() {
    const tests: Record<string, unknown> = {};

    try {
        tests.randomBytes = crypto.randomBytes(32).length === 32;
    } catch (e) {
        tests.randomBytes = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    try {
        tests.createHash = crypto.createHash("sha256").update("test").digest("hex").length === 64;
    } catch (e) {
        tests.createHash = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    try {
        tests.randomUUID = crypto.randomUUID().length === 36;
    } catch (e) {
        tests.randomUUID = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    try {
        tests.createHmac = crypto.createHmac("sha256", "secret").update("test").digest("hex").length === 64;
    } catch (e) {
        tests.createHmac = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    try {
        const cipher = crypto.createCipheriv("aes-256-gcm", crypto.randomBytes(32), crypto.randomBytes(16));
        tests.createCipheriv = !!cipher;
    } catch (e) {
        tests.createCipheriv = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    try {
        tests.pbkdf2Sync = crypto.pbkdf2Sync("password", "salt", 1000, 32, "sha256").length === 32;
    } catch (e) {
        tests.pbkdf2Sync = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    try {
        tests.webcrypto = typeof crypto.webcrypto !== "undefined";
    } catch (e) {
        tests.webcrypto = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    return tests;
}

async function testJose() {
    const tests: Record<string, unknown> = {};
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "test-secret-at-least-32-chars!!");

    try {
        const jwt = await new SignJWT({ test: true })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1h")
            .sign(secret);
        tests.signJWT = jwt.length > 0;

        const verified = await jwtVerify(jwt, secret);
        tests.verifyJWT = verified.payload.test === true;
    } catch (e) {
        tests.jwt = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    return tests;
}

async function testProvider() {
    const tests: Record<string, unknown> = {};

    try {
        const provider = GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        });
        tests.providerCreated = true;
        tests.providerId = provider.id;
        tests.providerType = provider.type;
        tests.hasAuthorization = !!provider.authorization;
        tests.hasToken = !!provider.token;
        tests.hasUserinfo = !!provider.userinfo;
    } catch (e) {
        tests.providerCreated = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    return tests;
}

async function testOAuthURL() {
    const tests: Record<string, unknown> = {};

    try {
        const baseUrl = process.env.NEXTAUTH_URL || "https://teleprompter24.com";
        const state = crypto.randomBytes(32).toString("hex");
        const codeVerifier = crypto.randomBytes(32).toString("base64url");
        const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");

        const params = new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            redirect_uri: `${baseUrl}/api/auth/callback/google`,
            response_type: "code",
            scope: "openid email profile",
            state: state,
            code_challenge: codeChallenge,
            code_challenge_method: "S256",
        });

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        tests.canBuildAuthURL = true;
        tests.authURLLength = authUrl.length;
        tests.authURLPreview = authUrl.substring(0, 100) + "...";
        tests.stateGenerated = state.length === 64;
        tests.pkceGenerated = codeChallenge.length > 0;
    } catch (e) {
        tests.canBuildAuthURL = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    return tests;
}

async function testFetch() {
    const tests: Record<string, unknown> = {};

    try {
        const response = await fetch("https://accounts.google.com/.well-known/openid-configuration");
        tests.canFetchGoogle = response.ok;
        const data = await response.json();
        tests.googleAuthEndpoint = data.authorization_endpoint;
        tests.googleTokenEndpoint = data.token_endpoint;
    } catch (e) {
        tests.canFetchGoogle = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    return tests;
}

async function testCookies() {
    const tests: Record<string, unknown> = {};

    try {
        // Test if we can create cookie-like strings
        const cookieValue = Buffer.from(JSON.stringify({ test: true })).toString("base64");
        tests.canCreateCookieValue = cookieValue.length > 0;
        tests.bufferWorks = Buffer.from("test").toString("base64") === "dGVzdA==";
    } catch (e) {
        tests.cookies = `FAILED: ${e instanceof Error ? e.message : e}`;
    }

    return tests;
}

export async function GET() {
    const results: Record<string, unknown> = {
        timestamp: new Date().toISOString(),
        runtime: typeof (globalThis as Record<string, unknown>).EdgeRuntime !== "undefined" ? "edge" : "node",
        env: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 25)}...` : "MISSING",
            GOOGLE_CLIENT_ID_LENGTH: (process.env.GOOGLE_CLIENT_ID || "").length,
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "SET" : "MISSING",
            GOOGLE_CLIENT_SECRET_LENGTH: (process.env.GOOGLE_CLIENT_SECRET || "").length,
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "MISSING",
            NEXTAUTH_SECRET_LENGTH: (process.env.NEXTAUTH_SECRET || "").length,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
            NODE_ENV: process.env.NODE_ENV || "unknown",
        },
    };

    // Run all tests
    results.crypto = await testCrypto();
    results.jose = await testJose();
    results.provider = await testProvider();
    results.oauthUrl = await testOAuthURL();
    results.fetch = await testFetch();
    results.cookies = await testCookies();

    // Summary
    const allTests = [
        ...Object.values(results.crypto as object),
        ...Object.values(results.jose as object),
        ...Object.values(results.provider as object),
        ...Object.values(results.oauthUrl as object),
        ...Object.values(results.fetch as object),
        ...Object.values(results.cookies as object),
    ];

    const failures = allTests.filter(v => typeof v === "string" && v.startsWith("FAILED"));
    results.summary = {
        totalTests: allTests.length,
        passed: allTests.filter(v => v === true).length,
        failed: failures.length,
        failures: failures,
    };

    return NextResponse.json(results, {
        status: failures.length > 0 ? 500 : 200,
        headers: { "Content-Type": "application/json" }
    });
}
