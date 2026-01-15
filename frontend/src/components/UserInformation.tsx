"use client";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

export default function UserInformation() {
    const { user, profile, loading } = useAuth();


    // Fallback: if auth context hasn't loaded yet but we have a stored user in localStorage,
    // parse it to avoid a flash of the Login button.
    let fallbackUser = null;
    if (!loading && !user && typeof window !== 'undefined') {
        const stored = localStorage.getItem('sb-user');
        if (stored) {
            try {
                fallbackUser = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored user', e);
            }
        }
    }

    if (loading) return null; // avoid hydration flicker
    if (!user) {
        return (
            <a href="/login" className="text-sm font-medium text-gray-600 hover:text-black">
                Login
            </a>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            {profile?.avatar_url ? (
                <Image
                    src={profile.avatar_url}
                    alt={profile.display_name ?? "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            ) : (
                <span className="w-8 h-8 rounded-full bg-gray-300" />
            )}
            <span className="text-sm font-medium text-gray-800">
                {profile?.display_name ?? user.email}
            </span>
        </div>
    );
}
