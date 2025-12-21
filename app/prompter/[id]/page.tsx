"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Settings, Play, Pause, RotateCw, ArrowLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

export default function PrompterPage() {
    const params = useParams();
    const { data: session } = useSession();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(2);
    const [fontSize, setFontSize] = useState(48);
    const [isMirrored, setIsMirrored] = useState(false);

    const scrollerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(null);

    const fetchDoc = useCallback(async () => { // Wrapped in useCallback
        if (!params.id) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/docs?id=${params.id}`);
            if (!res.ok) throw new Error("Failed to fetch doc");
            const data: { text: string } = await res.json();
            setText(data.text);
        } catch (err) {
            setError("Could not load document. Make sure you have access.");
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        // Load settings from localStorage
        const saved = localStorage.getItem("teleprompter-settings");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.speed !== undefined) setSpeed(parsed.speed);
            if (parsed.fontSize !== undefined) setFontSize(parsed.fontSize);
            if (parsed.mirror !== undefined) setIsMirrored(parsed.mirror);
        }
    }, []);

    useEffect(() => {
        if (session) {
            fetchDoc();
        }
    }, [session, fetchDoc]); // Valid dependency array

    // Refs for animation loop state to avoid restarting effect
    const speedRef = useRef(speed);
    const isPlayingRef = useRef(isPlaying);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        // Save settings to localStorage whenever they change
        const settings = { speed, fontSize, mirror: isMirrored };
        localStorage.setItem("teleprompter-settings", JSON.stringify(settings));
    }, [speed, fontSize, isMirrored]);

    useEffect(() => {
        let lastTime = 0;
        const scroll = (time: number) => {
            if (!lastTime) lastTime = time;
            const delta = time - lastTime;

            if (isPlayingRef.current && scrollerRef.current) {
                // Speed factor: Quadratic curve for better control
                // Adjusted multiplier from 0.08 -> 0.15 for significantly faster top speed
                const pixels = (Math.pow(speedRef.current, 2) * 0.15) * (delta / 16);
                scrollerRef.current.scrollTop += pixels;
            }

            lastTime = time;
            animationRef.current = requestAnimationFrame(scroll);
        };

        animationRef.current = requestAnimationFrame(scroll);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []); // Run once on mount

    if (loading) return <div className="flex h-screen items-center justify-center text-white bg-black">Loading...</div>;
    if (error) return <div className="flex h-screen items-center justify-center text-red-500 bg-black">{error}</div>;

    return (
        <div className="relative flex h-screen flex-col bg-black text-white overflow-hidden">
            {/* Controls Header - Always visible, responsive layout */}
            <div className="absolute top-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between bg-zinc-900/90 backdrop-blur-sm p-2 sm:p-4 gap-2 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
                    <Link href="/scripts" className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                    <Button variant="ghost" size="icon" onClick={fetchDoc} title="Refresh Content" className="h-8 w-8 sm:h-10 sm:w-10">
                        <RotateCw className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>

                    {/* Play button - visible on mobile in header */}
                    <Button
                        size="icon"
                        className={clsx(
                            "sm:hidden h-10 w-10",
                            isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                        )}
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                </div>

                <div className="flex items-center gap-2 sm:gap-6 flex-wrap justify-center">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-[10px] sm:text-xs text-zinc-400">SPEED</span>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            value={speed}
                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                            className="w-16 sm:w-24 accent-primary"
                        />
                    </div>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setFontSize(s => Math.max(20, s - 4))} className="h-7 w-7 sm:h-10 sm:w-10">
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <span className="text-xs sm:text-sm font-mono w-6 sm:w-8 text-center">{fontSize}</span>
                        <Button variant="ghost" size="icon" onClick={() => setFontSize(s => Math.min(200, s + 4))} className="h-7 w-7 sm:h-10 sm:w-10">
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </div>

                    <Button
                        variant={isMirrored ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setIsMirrored(!isMirrored)}
                        className="text-xs sm:text-sm h-7 sm:h-9 px-2 sm:px-3"
                    >
                        Mirror
                    </Button>

                    {/* Play button - hidden on mobile (shown above) */}
                    <Button
                        size="icon"
                        className={clsx(
                            "hidden sm:flex",
                            isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                        )}
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Prompter Area */}
            <div
                ref={scrollerRef}
                className={clsx(
                    "flex-1 overflow-y-auto px-4 sm:px-[10%] pt-24 sm:pt-20 pb-[50vh]", // Top padding for controls
                    isMirrored && "scale-x-[-1]"
                )}
            >
                <div
                    style={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
                    className="whitespace-pre-wrap font-bold text-center outline-none"
                >
                    {text}
                </div>
            </div>
        </div>
    );
}
