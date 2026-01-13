"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    error: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();

        // Get initial user
        supabase.auth.getUser()
            .then(({ data: { user: fetchedUser } }) => {
                setUser(fetchedUser);
                setError(null);
            })
            .catch((err: Error) => {
                console.error('Auth error:', err);
                setError('Failed to load user session');
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            if (session) {
                setUser(session.user);
                setError(null);
            } else {
                setUser(null);
                setError(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
