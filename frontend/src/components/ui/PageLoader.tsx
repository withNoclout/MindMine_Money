"use client";

import { BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";

export function PageLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // Start fade out after 800ms
        const fadeTimer = setTimeout(() => {
            setOpacity(0);
        }, 800);

        // Remove from DOM after transition (800ms + 500ms transition)
        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 1300);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            style={{
                opacity: opacity,
                transition: "opacity 0.5s ease-out"
            }}
            className="fixed inset-0 z-50 bg-[#09090b] flex flex-col items-center justify-center pointer-events-none"
        >
            <div className="flex items-center gap-3 animate-pulse">
                <BrainCircuit className="text-zinc-100" size={48} />
                <span className="text-3xl font-bold tracking-tighter text-white">MIND MINE</span>
            </div>
        </div>
    );
}
