"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, LogOut, RefreshCw } from 'lucide-react';

interface SessionWarningModalProps {
    isOpen: boolean;
    secondsRemaining: number;
    onContinue: () => void;
    onLogout: () => void;
}

export function SessionWarningModal({
    isOpen,
    secondsRemaining,
    onContinue,
    onLogout
}: SessionWarningModalProps) {
    const [count, setCount] = useState(secondsRemaining);

    useEffect(() => {
        setCount(secondsRemaining);
    }, [secondsRemaining]);

    useEffect(() => {
        if (!isOpen || count <= 0) return;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, count]);

    // Auto-logout when countdown reaches 0
    useEffect(() => {
        if (isOpen && count === 0) {
            onLogout();
        }
    }, [count, isOpen, onLogout]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
                    >
                        {/* Timer Circle */}
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="44"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    className="text-zinc-700"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="44"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={276.46}
                                    strokeDashoffset={276.46 * (1 - count / secondsRemaining)}
                                    className="text-yellow-500 transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">{count}</span>
                            </div>
                        </div>

                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-yellow-500" />
                        </div>

                        {/* Text */}
                        <h2 className="text-xl font-semibold text-white mb-2">Session Expiring Soon</h2>
                        <p className="text-zinc-400 mb-6">
                            Your session will expire in <span className="text-yellow-500 font-medium">{count} seconds</span> due to inactivity.
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={onLogout}
                                className="flex-1 px-4 py-3 rounded-xl font-medium bg-white/5 text-zinc-400 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={onContinue}
                                className="flex-1 px-4 py-3 rounded-xl font-medium bg-green-500 text-black hover:bg-green-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Stay Logged In
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
