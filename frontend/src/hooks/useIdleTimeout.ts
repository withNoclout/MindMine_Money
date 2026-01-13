"use client";

import { useEffect, useRef, useCallback } from 'react';

interface UseIdleTimeoutOptions {
    timeout: number; // in milliseconds
    warningTime?: number; // show warning X ms before timeout
    onWarning?: () => void;
    onTimeout: () => void;
    onActivity?: () => void;
    enabled?: boolean;
}

/**
 * Hook to track user idle time and trigger callbacks
 * 
 * @param options Configuration options
 * @returns Object with methods to reset timer and current idle time
 * 
 * @example
 * useIdleTimeout({
 *   timeout: 5 * 60 * 1000, // 5 minutes
 *   warningTime: 60 * 1000, // 1 minute warning
 *   onWarning: () => setShowWarning(true),
 *   onTimeout: () => signOut(),
 * });
 */
export function useIdleTimeout({
    timeout,
    warningTime = 60000, // 1 minute default
    onWarning,
    onTimeout,
    onActivity,
    enabled = true,
}: UseIdleTimeoutOptions) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const warningRef = useRef<NodeJS.Timeout | null>(null);
    const lastActivityRef = useRef<number>(Date.now());

    const clearTimers = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (warningRef.current) {
            clearTimeout(warningRef.current);
            warningRef.current = null;
        }
    }, []);

    const resetTimer = useCallback(() => {
        if (!enabled) return;

        clearTimers();
        lastActivityRef.current = Date.now();

        // Set warning timer
        if (onWarning && warningTime < timeout) {
            warningRef.current = setTimeout(() => {
                onWarning();
            }, timeout - warningTime);
        }

        // Set timeout timer
        timeoutRef.current = setTimeout(() => {
            onTimeout();
        }, timeout);

        onActivity?.();
    }, [timeout, warningTime, onWarning, onTimeout, onActivity, enabled, clearTimers]);

    useEffect(() => {
        if (!enabled) {
            clearTimers();
            return;
        }

        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];

        // Throttle the reset to avoid too many calls
        let throttleTimeout: NodeJS.Timeout | null = null;
        const throttledReset = () => {
            if (throttleTimeout) return;
            throttleTimeout = setTimeout(() => {
                throttleTimeout = null;
                resetTimer();
            }, 1000); // Throttle to once per second
        };

        // Add event listeners
        events.forEach(event => {
            document.addEventListener(event, throttledReset, { passive: true });
        });

        // Initial timer
        resetTimer();

        return () => {
            clearTimers();
            events.forEach(event => {
                document.removeEventListener(event, throttledReset);
            });
            if (throttleTimeout) {
                clearTimeout(throttleTimeout);
            }
        };
    }, [enabled, resetTimer, clearTimers]);

    return {
        resetTimer,
        getIdleTime: () => Date.now() - lastActivityRef.current,
    };
}
