"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition } from '@/components/ui/PageTransition';
import { AdminOnly } from '@/components/auth/RoleGuard';
import { createClient } from '@/lib/supabase/client';
import {
    Clock,
    CheckCircle,
    XCircle,
    ExternalLink,
    Building2,
    User,
    Loader2,
    RefreshCw
} from 'lucide-react';
import Script from 'next/script';

interface Application {
    id: string;
    user_id: string;
    reason: string;
    institution: string | null;
    proof_url: string | null;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    profiles: {
        display_name: string;
        avatar_url: string | null;
    };
}

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null);
    const [filter, setFilter] = useState<'pending' | 'all'>('pending');

    const fetchApplications = async () => {
        setLoading(true);
        const supabase = createClient();

        let query = supabase
            .from('educator_applications')
            .select(`
                *,
                profiles:user_id (display_name, avatar_url)
            `)
            .order('created_at', { ascending: false });

        if (filter === 'pending') {
            query = query.eq('status', 'pending');
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching applications:', error);
        } else {
            setApplications(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchApplications();
    }, [filter]);

    const handleApprove = async (applicationId: string, userId: string) => {
        setProcessing(applicationId);
        const supabase = createClient();

        // Update application status
        await supabase
            .from('educator_applications')
            .update({ status: 'approved', reviewed_at: new Date().toISOString() })
            .eq('id', applicationId);

        // Update user role to educator
        await supabase
            .from('profiles')
            .update({ role: 'educator' })
            .eq('id', userId);

        setProcessing(null);
        fetchApplications();
    };

    const handleReject = async (applicationId: string) => {
        setProcessing(applicationId);
        const supabase = createClient();

        await supabase
            .from('educator_applications')
            .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
            .eq('id', applicationId);

        setProcessing(null);
        fetchApplications();
    };

    return (
        <AdminOnly>

            <Navbar />
            <PageTransition>
                <div className="min-h-screen bg-black pt-24 pb-12">
                    <div className="max-w-4xl mx-auto px-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-2xl font-semibold text-white">Educator Applications</h1>
                                <p className="text-zinc-400 mt-1">Review and approve educator requests</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value as 'pending' | 'all')}
                                    className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-sm"
                                >
                                    <option value="pending">Pending Only</option>
                                    <option value="all">All Applications</option>
                                </select>
                                <button
                                    onClick={fetchApplications}
                                    className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Applications List */}
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                            </div>
                        ) : applications.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">No pending applications</h3>
                                <p className="text-zinc-400">All caught up! Check back later.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div
                                        key={app.id}
                                        className={`p-6 rounded-xl border ${app.status === 'pending'
                                            ? 'bg-zinc-900/50 border-white/10'
                                            : app.status === 'approved'
                                                ? 'bg-green-500/5 border-green-500/20'
                                                : 'bg-red-500/5 border-red-500/20'
                                            }`}
                                    >
                                        {/* Applicant Info */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                {app.profiles?.avatar_url ? (
                                                    <img
                                                        src={app.profiles.avatar_url}
                                                        alt=""
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                                        <User className="w-5 h-5 text-zinc-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-white">{app.profiles?.display_name || 'Unknown User'}</p>
                                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(app.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>

                                            {app.status !== 'pending' && (
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === 'approved'
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-red-500/10 text-red-400'
                                                    }`}>
                                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Institution */}
                                        {app.institution && (
                                            <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                                                <Building2 className="w-4 h-4" />
                                                {app.institution}
                                            </div>
                                        )}

                                        {/* Reason */}
                                        <div className="text-zinc-300 text-sm mb-4 bg-white/5 p-4 rounded-lg">
                                            {app.reason}
                                        </div>

                                        {/* Proof Link */}
                                        {app.proof_url && (
                                            <a
                                                href={app.proof_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-4"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                View Credentials
                                            </a>
                                        )}

                                        {/* Actions */}
                                        {app.status === 'pending' && (
                                            <div className="flex gap-3 pt-4 border-t border-white/5">
                                                <button
                                                    onClick={() => handleReject(app.id)}
                                                    disabled={processing === app.id}
                                                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(app.id, app.user_id)}
                                                    disabled={processing === app.id}
                                                    className="flex-1 px-4 py-2 rounded-lg bg-green-500 text-black font-medium hover:bg-green-400 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                                >
                                                    {processing === app.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="w-4 h-4" />
                                                            Approve
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </PageTransition>
        </AdminOnly>
    );
}
