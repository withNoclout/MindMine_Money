"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Building2, FileText, Send, X, Loader2, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/auth-context';

interface EducatorApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function EducatorApplicationModal({ isOpen, onClose, onSuccess }: EducatorApplicationModalProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        reason: '',
        institution: '',
        proofUrl: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();

            const { error: insertError } = await supabase
                .from('educator_applications')
                .insert({
                    user_id: user.id,
                    reason: formData.reason,
                    institution: formData.institution || null,
                    proof_url: formData.proofUrl || null,
                });

            if (insertError) {
                if (insertError.code === '23505') {
                    setError('You already have a pending application.');
                } else {
                    setError(insertError.message);
                }
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 2000);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Become an Educator</h2>
                                    <p className="text-sm text-zinc-400">Apply to sell notes on MindMine</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-zinc-500 hover:text-white cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {success ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Application Submitted!</h3>
                                <p className="text-zinc-400">We'll review your application and get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Reason */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Why do you want to become an educator? *
                                    </label>
                                    <textarea
                                        required
                                        value={formData.reason}
                                        onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                                        placeholder="I'm a teaching assistant at Stanford and want to share my handwritten lecture notes..."
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none resize-none h-24"
                                    />
                                </div>

                                {/* Institution */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        Institution / University
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.institution}
                                        onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                                        placeholder="Stanford University"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none"
                                    />
                                </div>

                                {/* Proof URL */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Link to credentials (optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.proofUrl}
                                        onChange={(e) => setFormData(prev => ({ ...prev, proofUrl: e.target.value }))}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none"
                                    />
                                </div>

                                {error && (
                                    <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading || !formData.reason}
                                    className="w-full px-4 py-3 rounded-xl font-medium bg-green-500 text-black hover:bg-green-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Application
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-zinc-500 text-center">
                                    Applications are typically reviewed within 24-48 hours.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
