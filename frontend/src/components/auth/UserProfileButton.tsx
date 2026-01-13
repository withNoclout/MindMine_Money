"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import Link from "next/link";

interface UserProfileButtonProps {
    variant?: "light" | "dark";
}

export function UserProfileButton({ variant = "dark" }: UserProfileButtonProps) {
    const { user, loading, signOut } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        setShowDropdown(false);
        await signOut();
    };

    // Loading state
    if (loading) {
        return (
            <div className="w-20 h-9 rounded-full bg-zinc-800 animate-pulse" />
        );
    }

    // Not logged in - show Login button
    if (!user) {
        return (
            <Link
                href="/login"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${variant === "light"
                    ? "bg-zinc-900 text-white hover:bg-zinc-800"
                    : "bg-white text-black hover:bg-zinc-200"
                    }`}
            >
                Login
            </Link>
        );
    }

    // Logged in - show user profile
    const displayName = user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "User";
    const avatarUrl = user.user_metadata?.avatar_url ||
        user.user_metadata?.picture;

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${variant === "light"
                    ? "border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white"
                    : "border-zinc-200 bg-white/90 hover:bg-white text-black"
                    }`}
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-6 h-6 rounded-full object-cover"
                    />
                ) : (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${variant === "light" ? "bg-zinc-700 text-white" : "bg-zinc-200 text-black"
                        }`}>
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="text-sm font-medium max-w-[100px] truncate">
                    {displayName}
                </span>
                <ChevronDown size={14} className={`transition-transform ${showDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDropdown(false)}
                    />

                    {/* Menu */}
                    <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-xl z-50 overflow-hidden ${variant === "light"
                        ? "bg-zinc-900 border-zinc-800"
                        : "bg-white border-zinc-200"
                        }`}>
                        <div className={`px-4 py-3 border-b ${variant === "light" ? "border-zinc-800" : "border-zinc-100"
                            }`}>
                            <p className={`text-sm font-medium truncate ${variant === "light" ? "text-white" : "text-black"
                                }`}>
                                {displayName}
                            </p>
                            <p className={`text-xs truncate ${variant === "light" ? "text-zinc-400" : "text-zinc-500"
                                }`}>
                                {user.email}
                            </p>
                        </div>

                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${variant === "light"
                                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                    : "text-zinc-600 hover:text-black hover:bg-zinc-50"
                                    }`}
                            >
                                <LogOut size={14} />
                                Sign out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
