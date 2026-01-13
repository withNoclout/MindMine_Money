"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/auth-context';
import { useIdleTimeout } from '@/hooks/useIdleTimeout';
import { SessionWarningModal } from '@/components/auth/SessionWarningModal';

// Session configuration
const SESSION_CONFIG = {
    TIMEOUT_MINUTES: 5, // 5 minutes of inactivity
    WARNING_SECONDS: 60, // Show warning 60 seconds before timeout
};

interface SessionContextType {
    isWarningVisible: boolean;
    extendSession: () => void;
    signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({
    isWarningVisible: false,
    extendSession: () => { },
    signOut: async () => { },
});

export function SessionProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const [showWarning, setShowWarning] = useState(false);

    // Sign out function
    const signOut = useCallback(async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setShowWarning(false);
        router.push('/login');
    }, [router]);

    // Extend session (close warning and reset timer)
    const extendSession = useCallback(() => {
        setShowWarning(false);
    }, []);

    // Only enable idle timeout when user is logged in
    const { resetTimer } = useIdleTimeout({
        timeout: SESSION_CONFIG.TIMEOUT_MINUTES * 60 * 1000,
        warningTime: SESSION_CONFIG.WARNING_SECONDS * 1000,
        onWarning: () => setShowWarning(true),
        onTimeout: signOut,
        onActivity: () => {
            // Reset warning on any activity before timeout
            if (!showWarning) return;
        },
        enabled: !!user,
    });

    // Handler for continuing session
    const handleContinue = useCallback(() => {
        extendSession();
        resetTimer();
    }, [extendSession, resetTimer]);

    return (
        <SessionContext.Provider value={{ isWarningVisible: showWarning, extendSession, signOut }}>
            {children}

            {/* Session Warning Modal */}
            <SessionWarningModal
                isOpen={showWarning && !!user}
                secondsRemaining={SESSION_CONFIG.WARNING_SECONDS}
                onContinue={handleContinue}
                onLogout={signOut}
            />
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}
