"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, FileText, ExternalLink, Play, X, Import } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Script {
    id: string;
    title: string;
    url: string;
    created_at: number;
}

export default function ScriptsPage() {
    const [scripts, setScripts] = useState<Script[]>([]);
    const [loading, setLoading] = useState(true);
    const [isImporting, setIsImporting] = useState(false);
    const [importUrl, setImportUrl] = useState("");
    const [importLoading, setImportLoading] = useState(false);
    const router = useRouter();

    const fetchScripts = async () => {
        try {
            const res = await fetch("/api/scripts");
            if (res.ok) {
                const data = await res.json();
                setScripts(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScripts();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (!confirm("Are you sure?")) return;

        await fetch(`/api/scripts?id=${id}`, { method: "DELETE" });
        setScripts(scripts.filter((s) => s.id !== id));
    };

    const handleImport = async () => {
        const match = importUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (!match || !match[1]) {
            alert("Invalid Google Doc URL. It should look like: https://docs.google.com/document/d/...");
            return;
        }

        const docId = match[1];
        setImportLoading(true);

        try {
            // 1. Fetch Doc Metadata
            const resDoc = await fetch(`/api/docs?id=${docId}`);
            if (!resDoc.ok) throw new Error("Could not access Google Doc. Check sharing permissions.");
            const docData = await resDoc.json();

            // 2. Save to DB
            const resDb = await fetch("/api/scripts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: docId,
                    title: docData.title || "Untitled Script",
                    url: importUrl
                })
            });

            if (!resDb.ok) throw new Error("Failed to save script.");

            // 3. Reset and Reload
            setImportUrl("");
            setIsImporting(false);
            fetchScripts(); // Refresh list

        } catch (err: any) {
            alert(err.message);
        } finally {
            setImportLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Scripts</h1>
                    <p className="text-muted-foreground">Manage and prompt your teleprompter scripts.</p>
                </div>
                <Button onClick={() => setIsImporting(!isImporting)} size="sm" className="gap-2">
                    {isImporting ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {isImporting ? "Cancel" : "Import Script"}
                </Button>
            </div>

            {isImporting && (
                <Card className="border-primary/20 bg-primary/5 w-full">
                    <CardHeader>
                        <CardTitle className="text-base">Import from Google Docs</CardTitle>
                        <CardDescription>Paste the sharing link of your Google Doc below.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-3">
                        <Input
                            placeholder="https://docs.google.com/document/d/..."
                            value={importUrl}
                            onChange={(e) => setImportUrl(e.target.value)}
                            className="flex-1 bg-background"
                            autoFocus
                        />
                        <Button onClick={handleImport} disabled={importLoading}>
                            {importLoading ? "Importing..." : "Import"}
                        </Button>
                    </CardContent>
                </Card>
            )}

            <Card className="w-full">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-8 text-center text-muted-foreground">Loading scripts...</div>
                    ) : scripts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                            <FileText className="h-12 w-12 opacity-20 mb-4" />
                            <p>No scripts found.</p>
                            <Button variant="link" onClick={() => setIsImporting(true)}>Import your first script</Button>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {scripts.map((script) => (
                                <div
                                    key={script.id}
                                    className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium truncate">{script.title}</div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                Google Doc • {new Date(script.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                        <Button variant="outline" size="sm" asChild className="hidden sm:flex gap-2">
                                            <Link href={`/prompter/${script.id}`}>
                                                <Play className="h-3 w-3" />
                                                Prompt
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild className="sm:hidden">
                                            <Link href={`/prompter/${script.id}`}>
                                                <Play className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Button variant="ghost" size="icon" asChild title="Open Google Doc">
                                            <a href={script.url} target="_blank" rel="noreferrer">
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            </a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-destructive"
                                            onClick={(e) => handleDelete(script.id, e)}
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
