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
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('sb-user');
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    });
    const [loading, setLoading] = useState<boolean>(!user);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Global signOut function with comprehensive cleanup
    const signOut = useCallback(async () => {
        // Clear local state immediately
        setUser(null);
        setProfile(null);
        setError(null);

        // Clear any cached auth data from localStorage immediately
        if (typeof window !== 'undefined') {
            const keysToRemove = Object.keys(localStorage).filter(key =>
                key.startsWith('sb-') || key.includes('supabase')
            );
            keysToRemove.forEach(key => localStorage.removeItem(key));

            // Schedule redirect IMMEDIATELY - this will fire no matter what
            setTimeout(() => {
                window.location.href = '/login';
            }, 500); // Small delay to let localStorage clear
        }

        // Fire-and-forget: try to sign out from Supabase but don't wait for it
        try {
            const supabase = createClient();
            supabase.auth.signOut({ scope: 'global' }).catch(console.error);
        } catch (error) {
            console.error('Supabase signOut error:', error);
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
        let isMounted = true;
        let retryCount = 0;
        const MAX_RETRIES = 3;

        // Get initial user and profile with retry logic
        const initAuth = async (): Promise<void> => {
            try {
                // Use getSession which is more reliable than getUser
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) {
                    throw sessionError;
                }

                if (!isMounted) return;

                if (session?.user) {
                    setUser(session.user);
                    const userProfile = await fetchProfile(session.user.id);
                    if (isMounted) {
                        setProfile(userProfile);
                        setError(null);
                    }
                } else {
                    setUser(null);
                    setProfile(null);
                }

                if (isMounted) {
                    setLoading(false);
                }
            } catch (err: unknown) {
                // Retry on AbortError (common with React StrictMode)
                if (err instanceof Error && err.name === 'AbortError') {
                    if (retryCount < MAX_RETRIES) {
                        retryCount++;
                        console.log(`Auth retry ${retryCount}/${MAX_RETRIES}...`);
                        setTimeout(() => {
                            if (isMounted) initAuth();
                        }, 500 * retryCount); // Exponential backoff
                        return;
                    }
                    // Max retries reached, just set loading to false
                    console.warn('Auth initialization failed after retries');
                    if (isMounted) setLoading(false);
                    return;
                }

                console.error('Auth error:', err);
                if (isMounted) {
                    setError('Failed to load user session');
                    setUser(null);
                    setProfile(null);
                    setLoading(false);
                }
            }
        };

        // If user already loaded from localStorage, skip async init
        if (user) {
            setLoading(false);
            return;
        }
        // Start auth initialization
        initAuth();
        // Listen for auth changes - this handles login/logout events
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event: AuthChangeEvent, session: Session | null) => {
                if (!isMounted) return;

                console.log('Auth state changed:', event, session?.user?.email);

                // Handle specific events
                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    if (session?.user) {
                        setUser(session.user);
                        setLoading(true); // Show loading while fetching profile
                        const userProfile = await fetchProfile(session.user.id);
                        if (isMounted) {
                            setProfile(userProfile);
                            setError(null);
                            setLoading(false);
                        }
                    }
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                    setProfile(null);
                    setError(null);
                    setLoading(false);
                } else if (event === 'INITIAL_SESSION') {
                    // Initial session event - update state if we have a session
                    if (session?.user) {
                        setUser(session.user);
                        const userProfile = await fetchProfile(session.user.id);
                        if (isMounted) {
                            setProfile(userProfile);
                            setError(null);
                        }
                    }
                    setLoading(false);
                }
            }
        );

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
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

