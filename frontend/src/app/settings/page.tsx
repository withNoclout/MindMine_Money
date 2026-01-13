"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition } from '@/components/ui/PageTransition';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { EducatorApplicationModal } from '@/components/auth/EducatorApplicationModal';
import {
    User,
    GraduationCap,
    Mail,
    Calendar,
    LogOut,
    ChevronRight,
    Clock,
    CheckCircle,
    XCircle,
    Loader2
} from 'lucide-react';
import Script from 'next/script';

interface ApplicationStatus {
    status: 'pending' | 'approved' | 'rejected' | null;
    created_at: string | null;
}

export default function SettingsPage() {
    const { user, profile, role, loading, signOut } = useAuth();
    const router = useRouter();
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>({ status: null, created_at: null });
    const [loadingApplication, setLoadingApplication] = useState(true);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user, router]);

    // Fetch application status
    useEffect(() => {
        async function fetchApplication() {
            if (!user) return;

            const supabase = createClient();
            const { data } = await supabase
                .from('educator_applications')
                .select('status, created_at')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (data) {
                setApplicationStatus({ status: data.status, created_at: data.created_at });
            }
            setLoadingApplication(false);
        }

        if (user) {
            fetchApplication();
        }
    }, [user]);

    const handleApplicationSuccess = () => {
        setApplicationStatus({ status: 'pending', created_at: new Date().toISOString() });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
    const avatarUrl = user.user_metadata?.avatar_url;
    const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <>
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
            <Navbar />
            <PageTransition>
                <div className="min-h-screen bg-black pt-24 pb-12">
                    <div className="max-w-2xl mx-auto px-6">
                        {/* Profile Header */}
                        <div className="flex items-center gap-6 mb-12">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-white/10"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black text-2xl font-bold">
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-semibold text-white">{displayName}</h1>
                                <div className="flex items-center gap-2 text-zinc-400 mt-1">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${role === 'educator' ? 'bg-green-500/10 text-green-400' :
                                            role === 'admin' ? 'bg-purple-500/10 text-purple-400' :
                                                'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {role === 'educator' ? 'Educator' : role === 'admin' ? 'Admin' : 'Student'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-4 mb-8">
                            {/* Email */}
                            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Email</p>
                                    <p className="text-white">{user.email}</p>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Member Since</p>
                                    <p className="text-white">{memberSince}</p>
                                </div>
                            </div>
                        </div>

                        {/* Educator Section */}
                        {role === 'student' && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-white mb-4">Become an Educator</h2>

                                {loadingApplication ? (
                                    <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center">
                                        <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />
                                    </div>
                                ) : applicationStatus.status === 'pending' ? (
                                    <div className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Clock className="w-5 h-5 text-yellow-500" />
                                            <h3 className="font-medium text-yellow-400">Application Pending</h3>
                                        </div>
                                        <p className="text-zinc-400 text-sm">
                                            Your application is being reviewed. We'll notify you once a decision is made.
                                        </p>
                                    </div>
                                ) : applicationStatus.status === 'rejected' ? (
                                    <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <XCircle className="w-5 h-5 text-red-500" />
                                            <h3 className="font-medium text-red-400">Application Not Approved</h3>
                                        </div>
                                        <p className="text-zinc-400 text-sm mb-4">
                                            Your previous application was not approved. You can submit a new application.
                                        </p>
                                        <button
                                            onClick={() => setShowApplicationModal(true)}
                                            className="px-4 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                            Apply Again
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <GraduationCap className="w-5 h-5 text-green-500" />
                                            <h3 className="font-medium text-white">Want to sell notes?</h3>
                                        </div>
                                        <p className="text-zinc-400 text-sm mb-4">
                                            Apply to become an educator and start monetizing your knowledge.
                                        </p>
                                        <button
                                            onClick={() => setShowApplicationModal(true)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-black font-medium text-sm hover:bg-green-400 transition-colors cursor-pointer"
                                        >
                                            Apply Now
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Educator Status */}
                        {role === 'educator' && (
                            <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20 mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <h3 className="font-medium text-green-400">Educator Status Active</h3>
                                </div>
                                <p className="text-zinc-400 text-sm">
                                    You have full access to sell notes on the marketplace.
                                </p>
                            </div>
                        )}

                        {/* Sign Out */}
                        <button
                            onClick={signOut}
                            className="w-full p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center gap-4 hover:bg-zinc-900 transition-colors cursor-pointer group"
                        >
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <LogOut className="w-5 h-5 text-red-400" />
                            </div>
                            <span className="text-red-400 group-hover:text-red-300">Sign Out</span>
                        </button>
                    </div>
                </div>
            </PageTransition>

            {/* Application Modal */}
            <EducatorApplicationModal
                isOpen={showApplicationModal}
                onClose={() => setShowApplicationModal(false)}
                onSuccess={handleApplicationSuccess}
            />
        </>
    );
}
