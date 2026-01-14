"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
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
}

const SessionContext = createContext<SessionContextType>({
    isWarningVisible: false,
    extendSession: () => { },
});

export function SessionProvider({ children }: { children: ReactNode }) {
    // Get user and signOut from AuthProvider (the single source of truth)
    const { user, signOut } = useAuth();
    const [showWarning, setShowWarning] = useState(false);

    // Extend session (close warning and reset timer)
    const extendSession = useCallback(() => {
        setShowWarning(false);
    }, []);

    // Handle timeout - use AuthProvider's signOut
    const handleTimeout = useCallback(async () => {
        setShowWarning(false);
        await signOut();
    }, [signOut]);

    // Only enable idle timeout when user is logged in
    const { resetTimer } = useIdleTimeout({
        timeout: SESSION_CONFIG.TIMEOUT_MINUTES * 60 * 1000,
        warningTime: SESSION_CONFIG.WARNING_SECONDS * 1000,
        onWarning: () => setShowWarning(true),
        onTimeout: handleTimeout,
        onActivity: () => {
            // Could reset warning on activity if needed
        },
        enabled: !!user,
    });

    // Handler for continuing session
    const handleContinue = useCallback(() => {
        extendSession();
        resetTimer();
    }, [extendSession, resetTimer]);

    return (
        <SessionContext.Provider value={{ isWarningVisible: showWarning, extendSession }}>
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
