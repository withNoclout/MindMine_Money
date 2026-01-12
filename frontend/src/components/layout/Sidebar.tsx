"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    UploadCloud,
    Wallet,
    BookOpen,
    Settings,
    LogOut,
    BrainCircuit,
    PieChart
} from "lucide-react";

const sidebarItems = [
    {
        category: "Educator",
        items: [
            { label: "Dashboard", href: "/educator/dashboard", icon: LayoutDashboard },
            { label: "Upload Content", href: "/educator/upload", icon: UploadCloud },
            { label: "Analytics", href: "/educator/analytics", icon: PieChart },
            { label: "Earnings", href: "/educator/earnings", icon: Wallet },
        ],
    },
    {
        category: "Student",
        items: [
            { label: "Browse", href: "/student/browse", icon: BookOpen },
            { label: "My Learning", href: "/student/purchases", icon: BrainCircuit },
            { label: "Wallet", href: "/student/wallet", icon: Wallet },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="h-screen w-64 flex flex-col fixed left-0 top-0 border-r border-white/10 glass-dark text-white z-40">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    MindMine
                </h1>
                <p className="text-xs text-gray-400">AI Education Marketplace</p>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {sidebarItems.map((group, idx) => (
                    <div key={idx}>
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {group.category}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                                            isActive
                                                ? "bg-primary/10 text-primary shadow-glow"
                                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-500 group-hover:text-white")} />
                                        {item.label}

                                        {/* Active Indicator */}
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / User Settings */}
            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings</span>
                </button>
            </div>
        </div>
    );
}
