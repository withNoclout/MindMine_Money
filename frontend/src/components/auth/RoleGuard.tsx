"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Loader2, ShieldX } from "lucide-react";

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: ('student' | 'educator' | 'admin')[];
    fallbackUrl?: string;
}

/**
 * RoleGuard - Protects routes based on user role
 * 
 * Usage:
 * <RoleGuard allowedRoles={['educator', 'admin']}>
 *   <StudioPage />
 * </RoleGuard>
 */
export function RoleGuard({ children, allowedRoles, fallbackUrl = '/browse' }: RoleGuardProps) {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If not loading and no user, redirect to login
        if (!loading && !user) {
            router.push('/login');
            return;
        }

        // If not loading, has user, but role not allowed
        if (!loading && user && role && !allowedRoles.includes(role)) {
            router.push(fallbackUrl);
        }
    }, [loading, user, role, allowedRoles, router, fallbackUrl]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-green-500 animate-spin mx-auto mb-4" />
                    <p className="text-zinc-400">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    // Role not allowed
    if (role && !allowedRoles.includes(role)) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                        <ShieldX className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">Access Restricted</h2>
                    <p className="text-zinc-400 mb-6">
                        This page is only available to educators. Upgrade your account to access selling features.
                    </p>
                    <button
                        onClick={() => router.push(fallbackUrl)}
                        className="px-6 py-3 rounded-xl font-medium bg-green-500 text-black hover:bg-green-400 transition-colors cursor-pointer"
                    >
                        Go to Marketplace
                    </button>
                </div>
            </div>
        );
    }

    // All checks passed, render children
    return <>{children}</>;
}

/**
 * EducatorOnly - Shorthand for educator/admin only routes
 */
export function EducatorOnly({ children }: { children: ReactNode }) {
    return (
        <RoleGuard allowedRoles={['educator', 'admin']}>
            {children}
        </RoleGuard>
    );
}

/**
 * AdminOnly - Shorthand for admin only routes
 */
export function AdminOnly({ children }: { children: ReactNode }) {
    return (
        <RoleGuard allowedRoles={['admin']}>
            {children}
        </RoleGuard>
    );
}
