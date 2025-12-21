// Extend CloudflareEnv with our custom bindings
declare global {
    interface CloudflareEnv {
        DB: D1Database;
    }
}

export {};
