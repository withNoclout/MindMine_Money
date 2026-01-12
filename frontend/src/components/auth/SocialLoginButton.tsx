"use client";

import { createClient } from "@/lib/supabase/client";
import { Apple, Mail } from "lucide-react";

type Provider = "google" | "apple";

interface SocialLoginButtonProps {
    provider: Provider;
    className?: string;
}

export function SocialLoginButton({ provider, className = "" }: SocialLoginButtonProps) {
    const handleLogin = async () => {
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=/`,
            },
        });

        if (error) {
            console.error(`OAuth error (${provider}):`, error.message);
        }
    };

    const config = {
        google: {
            icon: Mail,
            label: "Google",
            bgClass: "bg-white/5 hover:bg-white/10",
        },
        apple: {
            icon: Apple,
            label: "Apple",
            bgClass: "bg-white/5 hover:bg-white/10",
        },
    };

    const { icon: Icon, label, bgClass } = config[provider];

    return (
        <button
            type="button"
            onClick={handleLogin}
            className={`flex-1 py-3 px-4 rounded-xl border border-white/10 ${bgClass} transition-colors flex justify-center items-center gap-2 text-sm font-medium text-white ${className}`}
        >
            <Icon size={16} />
            {label}
        </button>
    );
}

// Account linking function for existing users
export async function linkAccount(provider: Provider) {
    const supabase = createClient();
    const { error } = await supabase.auth.linkIdentity({ provider });

    if (error) {
        console.error(`Link error (${provider}):`, error.message);
        throw error;
    }
}
