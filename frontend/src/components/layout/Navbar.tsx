"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit } from "lucide-react";
import { UserProfileButton } from "@/components/auth/UserProfileButton";
import { TabNav } from "@/components/ui/TabNav";

interface NavbarProps {
    showTabs?: boolean;
}

export function Navbar({ showTabs = true }: NavbarProps) {
    const pathname = usePathname();

    // Don't show tabs on landing page
    const isLanding = pathname === "/";
    const displayTabs = showTabs && !isLanding;

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#09090b]/80">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <BrainCircuit className="w-6 h-6 text-zinc-100 transition-transform group-hover:-rotate-12" />
                    <span className="text-lg font-semibold tracking-tighter text-white">MIND MINE</span>
                </Link>

                {displayTabs ? (
                    <TabNav />
                ) : (
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <Link href="/browse" className="hover:text-white transition-colors">Marketplace</Link>
                        <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    </div>
                )}

                <UserProfileButton variant="dark" />
            </div>
        </nav>
    );
}
