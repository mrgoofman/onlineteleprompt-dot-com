import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest } from "next/server";

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
    };
}

async function handler(req: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
    try {
        const authOptions = getAuthOptions();
        return await NextAuth(req, context, authOptions);
    } catch (error) {
        console.error("NextAuth error:", error);
        return new Response(JSON.stringify({
            error: "Auth error",
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
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
