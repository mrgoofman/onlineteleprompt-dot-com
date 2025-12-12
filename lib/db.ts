// Edge-compatible database module for Cloudflare D1
// This replaces mock-db.ts which used Node.js fs/path

// D1 Database interface (Cloudflare Workers)
export interface D1Database {
    prepare: (query: string) => D1PreparedStatement;
}

export interface D1PreparedStatement {
    bind: (...values: unknown[]) => D1PreparedStatement;
    run: <T = unknown>() => Promise<D1Result<T>>;
    all: <T = unknown>() => Promise<D1Result<T>>;
    first: <T = unknown>() => Promise<T | null>;
}

export interface D1Result<T = unknown> {
    results: T[];
    success: boolean;
    error?: string;
    meta?: unknown;
}

// In-memory store for development/fallback when D1 is not available
interface Script {
    id: string;
    user_email: string;
    title: string;
    url: string;
    created_at: number;
}

// Simple in-memory storage for Edge Runtime (no file system access)
const memoryStore: Script[] = [];

// Mock D1 implementation for development
class InMemoryD1Database implements D1Database {
    prepare(query: string): D1PreparedStatement {
        return new InMemoryPreparedStatement(query);
    }
}

class InMemoryPreparedStatement implements D1PreparedStatement {
    private query: string;
    private args: unknown[] = [];

    constructor(query: string) {
        this.query = query;
    }

    bind(...values: unknown[]): D1PreparedStatement {
        this.args = values;
        return this;
    }

    async run<T = unknown>(): Promise<D1Result<T>> {
        this.execute();
        return { results: [], success: true };
    }

    async all<T = unknown>(): Promise<D1Result<T>> {
        const results = this.execute() as T[];
        return { results: results || [], success: true };
    }

    async first<T = unknown>(): Promise<T | null> {
        const results = this.execute();
        return (results?.[0] as T) || null;
    }

    private execute(): Script[] | null {
        if (this.query.includes("INSERT INTO scripts")) {
            const newScript: Script = {
                id: this.args[0] as string,
                user_email: this.args[1] as string,
                title: this.args[2] as string,
                url: this.args[3] as string,
                created_at: this.args[4] as number,
            };
            // Remove existing if any (upsert-ish)
            const existingIndex = memoryStore.findIndex((s) => s.id === newScript.id);
            if (existingIndex >= 0) {
                memoryStore.splice(existingIndex, 1);
            }
            memoryStore.push(newScript);
            return null;
        }

        if (this.query.includes("SELECT * FROM scripts")) {
            const email = this.args[0] as string;
            return memoryStore
                .filter((s) => s.user_email === email)
                .sort((a, b) => b.created_at - a.created_at);
        }

        if (this.query.includes("DELETE FROM scripts")) {
            const id = this.args[0] as string;
            const email = this.args[1] as string;
            const index = memoryStore.findIndex(
                (s) => s.id === id && s.user_email === email
            );
            if (index >= 0) {
                memoryStore.splice(index, 1);
            }
            return null;
        }

        return [];
    }
}

// Get database instance - uses D1 in production, in-memory for development
export function getDB(env?: { DB?: D1Database }): D1Database {
    // Check for Cloudflare D1 binding
    if (env?.DB) {
        return env.DB;
    }

    // Check for process.env.DB (set by wrangler in some configurations)
    if (typeof process !== "undefined" && process.env?.DB) {
        return process.env.DB as unknown as D1Database;
    }

    // Fallback to in-memory database for development
    console.warn("Using in-memory database (D1 not available)");
    return new InMemoryD1Database();
}
