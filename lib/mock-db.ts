import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "local-db.json");

interface Script {
    id: string;
    user_email: string;
    title: string;
    url: string;
    created_at: number;
}

export class MockD1Database {
    private getScripts(): Script[] {
        if (!fs.existsSync(DB_PATH)) return [];
        try {
            return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
        } catch {
            return [];
        }
    }

    private saveScripts(scripts: Script[]) {
        fs.writeFileSync(DB_PATH, JSON.stringify(scripts, null, 2));
    }

    prepare(query: string) {
        return new MockD1PreparedStatement(this, query);
    }
}

class MockD1PreparedStatement {
    private db: MockD1Database;
    private query: string;
    private args: any[] = [];

    constructor(db: MockD1Database, query: string) {
        this.db = db;
        this.query = query;
    }

    bind(...values: any[]) {
        this.args = values;
        return this;
    }

    async run() {
        this.execute();
        return { success: true };
    }

    async all() {
        const results = this.execute();
        return { results, success: true };
    }

    private execute() {
        // Basic SQL emulation for our specific queries
        const scripts = this.db["getScripts"](); // Access private method

        if (this.query.includes("INSERT INTO scripts")) {
            // args: [id, user_email, title, url, created_at]
            const newScript: Script = {
                id: this.args[0],
                user_email: this.args[1],
                title: this.args[2],
                url: this.args[3],
                created_at: this.args[4]
            };
            // Remove existing if any (upsert-ish)
            const filtered = scripts.filter(s => s.id !== newScript.id);
            filtered.push(newScript);
            this.db["saveScripts"](filtered);
            return null;
        }

        if (this.query.includes("SELECT * FROM scripts")) {
            // .bind(session.user.email)
            const email = this.args[0];
            return scripts
                .filter(s => s.user_email === email)
                .sort((a, b) => b.created_at - a.created_at);
        }

        if (this.query.includes("DELETE FROM scripts")) {
            // .bind(id, session.user.email)
            const id = this.args[0];
            const email = this.args[1];
            const filtered = scripts.filter(s => !(s.id === id && s.user_email === email));
            this.db["saveScripts"](filtered);
            return null;
        }

        return [];
    }
}
