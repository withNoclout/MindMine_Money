"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabNavProps {
    className?: string;
}

export function TabNav({ className = "" }: TabNavProps) {
    const pathname = usePathname();

    const tabs = [
        { href: "/browse", label: "Marketplace" },
        { href: "/studio", label: "Sell Notes" },
    ];

    const activeIndex = tabs.findIndex(tab => pathname === tab.href);

    return (
        <div className={`relative flex items-center gap-1 p-1 rounded-xl bg-zinc-900/50 border border-white/5 ${className}`}>
            {/* Sliding indicator */}
            <div
                className="absolute top-1 bottom-1 rounded-lg bg-green-500/20 border border-green-500/30 transition-all duration-300 ease-out"
                style={{
                    width: `calc(50% - 4px)`,
                    left: activeIndex === 0 ? '4px' : 'calc(50% + 0px)',
                }}
            />

            {tabs.map((tab) => (
                <Link
                    key={tab.href}
                    href={tab.href}
                    className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium text-center rounded-lg transition-colors ${pathname === tab.href
                            ? "text-green-400"
                            : "text-zinc-400 hover:text-white"
                        }`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
}
