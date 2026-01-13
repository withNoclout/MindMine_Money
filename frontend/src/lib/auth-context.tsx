"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        supabase.auth.getUser()
            .then(async ({ data: { user: fetchedUser } }) => {
                setUser(fetchedUser);
                if (fetchedUser) {
                    const userProfile = await fetchProfile(fetchedUser.id);
                    setProfile(userProfile);
                }
                setError(null);
            })
            .catch((err: Error) => {
                console.error('Auth error:', err);
                setError('Failed to load user session');
                setUser(null);
                setProfile(null);
            })
            .finally(() => {
                setLoading(false);
            });

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
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

