import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";

export const dynamic = "force-dynamic";

function getAuthOptions(): NextAuthOptions {
    return {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                authorization: {
                    params: {
                        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/drive.readonly",
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code",
                    },
                },
            }),
        ],
        callbacks: {
            async jwt({ token, account }) {
                if (account) {
                    token.accessToken = account.access_token || "";
                    token.refreshToken = account.refresh_token || "";
                }
                return token;
            },
            async session({ session, token }) {
                session.accessToken = token.accessToken as string;
                return session;
            },
        },
        pages: {
            signIn: '/',
        },
        session: {
            strategy: "jwt",
        },
        secret: process.env.NEXTAUTH_SECRET,
        debug: true,
        // Cookie configuration for Cloudflare Workers - SameSite=None required for cross-site OAuth redirects
        cookies: {
            sessionToken: {
                name: `__Secure-next-auth.session-token`,
                options: {
                    httpOnly: true,
                    sameSite: 'none',
                    path: '/',
                    secure: true,
                    domain: 'teleprompter24.com'
                }
            },
            callbackUrl: {
                name: `__Secure-next-auth.callback-url`,
                options: {
                    httpOnly: true,
                    sameSite: 'none',
                    path: '/',
                    secure: true,
                    domain: 'teleprompter24.com'
                }
            },
            csrfToken: {
                name: `__Host-next-auth.csrf-token`,
                options: {
                    httpOnly: true,
                    sameSite: 'none',
                    path: '/',
                    secure: true,
                }
            },
            pkceCodeVerifier: {
                name: `__Secure-next-auth.pkce.code_verifier`,
                options: {
                    httpOnly: true,
                    sameSite: 'none',
                    path: '/',
                    secure: true,
                    maxAge: 3600,
                    domain: 'teleprompter24.com'
                }
            },
            state: {
                name: `__Secure-next-auth.state`,
                options: {
                    httpOnly: true,
                    sameSite: 'none',
                    path: '/',
                    secure: true,
                    maxAge: 3600,
                    domain: 'teleprompter24.com'
                }
            },
            nonce: {
                name: `__Secure-next-auth.nonce`,
                options: {
                    httpOnly: true,
                    sameSite: 'none',
                    path: '/',
                    secure: true,
                    domain: 'teleprompter24.com'
                }
            }
        },
    };
}

// Manual OAuth redirect as fallback - bypasses NextAuth's problematic signin flow
async function manualGoogleRedirect(req: NextRequest): Promise<Response> {
    const baseUrl = process.env.NEXTAUTH_URL || "https://teleprompter24.com";
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || baseUrl;
    const isDebug = req.nextUrl.searchParams.get("debug") === "true";

    // Generate state and PKCE values
    const state = crypto.randomBytes(32).toString("hex");
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");

    // Store state and code_verifier in cookies for callback verification
    const stateData = JSON.stringify({ state, codeVerifier, callbackUrl });
    const encodedState = Buffer.from(stateData).toString("base64url");

    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        redirect_uri: `${baseUrl}/api/auth/callback/google`,
        response_type: "code",
        scope: "openid email profile https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/drive.readonly",
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
        access_type: "offline",
        prompt: "consent",
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    // Debug mode - return JSON instead of redirecting
    if (isDebug) {
        return NextResponse.json({
            success: true,
            message: "Debug mode - not redirecting. Copy authUrl and paste in browser.",
            authUrl,
            redirectUri: `${baseUrl}/api/auth/callback/google`,
            state: state.substring(0, 20) + "...",
            env: {
                GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 20) + "..." : "MISSING",
                NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
                NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "MISSING",
            },
            cookieToSet: {
                name: "oauth_state",
                value: encodedState.substring(0, 50) + "...",
            }
        });
    }

    const response = NextResponse.redirect(authUrl);
    response.cookies.set("oauth_state", encodedState, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600, // 1 hour
        path: "/",
        domain: "teleprompter24.com",
    });

    return response;
}

async function handler(req: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
    const params = await context.params;
    const path = params.nextauth?.join("/") || "";

    // Log request details for debugging
    console.log("NextAuth request:", {
        path,
        method: req.method,
        url: req.url,
        headers: Object.fromEntries(req.headers.entries()),
    });

    // Intercept signin/google and use manual redirect (both GET and POST)
    if (path === "signin/google") {
        console.log("Using manual Google OAuth redirect, method:", req.method);
        try {
            return await manualGoogleRedirect(req);
        } catch (error) {
            console.error("Manual redirect failed:", error);
            // Fall through to NextAuth
        }
    }

    try {
        const authOptions = getAuthOptions();
        return await NextAuth(req, context, authOptions);
    } catch (error) {
        console.error("NextAuth error:", error);
        return new Response(JSON.stringify({
            error: "Auth error",
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            path,
            method: req.method,
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export { handler as GET, handler as POST };

// Export authOptions for use in other files (e.g., getServerSession)
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    session: {
        strategy: "jwt",
    },
};
