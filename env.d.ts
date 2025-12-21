// Extend CloudflareEnv with our custom bindings
declare global {
    interface CloudflareEnv {
        DB: D1Database;
    }

    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

export {};
