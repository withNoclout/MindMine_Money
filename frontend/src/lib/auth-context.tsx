"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export type UserRole = 'student' | 'educator' | 'admin' | null;

interface UserProfile {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    role: UserRole;
    total_earnings: number;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    role: UserRole;
    loading: boolean;
    error: string | null;
    isEducator: boolean;
    isStudent: boolean;
    isAdmin: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    role: null,
    loading: true,
    error: null,
    isEducator: false,
    isStudent: false,
    isAdmin: false,
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Global signOut function with error handling
    const signOut = useCallback(async () => {
        try {
            const supabase = createClient();
            await supabase.auth.signOut();
        } catch (error) {
            console.error('SignOut error:', error);
            // Continue with cleanup even if Supabase call fails
        } finally {
            // Always clear local state and redirect
            setUser(null);
            setProfile(null);
            setError(null);
            // Use window.location for hard redirect to ensure clean state
            window.location.href = '/login';
        }
    }, []);

    // Fetch user profile with role
    const fetchProfile = async (userId: string) => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('profiles')
            .select('id, display_name, avatar_url, role, total_earnings')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }

        return data as UserProfile;
    };

    useEffect(() => {
        const supabase = createClient();

        // Get initial user and profile
        const initAuth = async () => {
            try {
                const { data: { user: fetchedUser } } = await supabase.auth.getUser();
                setUser(fetchedUser);
                if (fetchedUser) {
                    const userProfile = await fetchProfile(fetchedUser.id);
                    setProfile(userProfile);
                }
                setError(null);
            } catch (err) {
                console.error('Auth error:', err);
                setError('Failed to load user session');
                setUser(null);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
            if (session) {
                setUser(session.user);
                const userProfile = await fetchProfile(session.user.id);
                setProfile(userProfile);
                setError(null);
            } else {
                setUser(null);
                setProfile(null);
                setError(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const role = profile?.role || null;

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            role,
            loading,
            error,
            isEducator: role === 'educator' || role === 'admin',
            isStudent: role === 'student',
            isAdmin: role === 'admin',
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

