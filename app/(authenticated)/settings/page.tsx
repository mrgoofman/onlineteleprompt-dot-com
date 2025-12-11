"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function SettingsPage() {
    const [speed, setSpeed] = useState(2);
    const [fontSize, setFontSize] = useState(48);
    const [mirror, setMirror] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("teleprompter-settings");
        if (saved) {
            const parsed = JSON.parse(saved);
            setSpeed(parsed.speed ?? 2);
            setFontSize(parsed.fontSize ?? 48);
            setMirror(parsed.mirror ?? false);
        }
    }, []);

    const handleSave = () => {
        const settings = { speed, fontSize, mirror };
        localStorage.setItem("teleprompter-settings", JSON.stringify(settings));
        alert("Settings saved!");
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Configure your default teleprompter preferences.</p>
            </div>

            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Defaults</CardTitle>
                    <CardDescription>
                        These settings will be applied whenever you open a new script.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Default Scroll Speed (0-10)</label>
                        <Input
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Default Font Size (px)</label>
                        <Input
                            type="number"
                            min="20"
                            max="200"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="mirror"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={mirror}
                            onChange={(e) => setMirror(e.target.checked)}
                        />
                        <label htmlFor="mirror" className="text-sm font-medium">Enable Mirror Mode by Default</label>
                    </div>

                    <Button onClick={handleSave} className="w-fit">
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
