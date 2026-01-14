"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/client";
import { fetchPurchases } from "@/lib/supabase/purchases";
import { fetchNotesBySeller } from "@/lib/supabase/notes";
import { Note, Purchase, Profile } from "@/types/database";
import { FileText, Download, DollarSign, ShoppingBag, User, Loader2 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

type Tab = 'purchases' | 'sales' | 'profile';

export default function AccountPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('purchases');
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [myNotes, setMyNotes] = useState<Note[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                return;
            }

            setUserId(user.id);

            // Fetch user profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profileData);

            // Fetch purchases
            const purchasesData = await fetchPurchases(user.id);
            setPurchases(purchasesData);

            // Fetch my notes (sales)
            const notesData = await fetchNotesBySeller(user.id);
            setMyNotes(notesData);

            setLoading(false);
        }
        loadData();
    }, [router]);

    const totalEarnings = myNotes.reduce((sum, note) => sum + note.price * note.downloads, 0);

    if (loading) {
        return (
            <>

                <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
                </div>
            </>
        );
    }

    return (
        <>


            <div className="min-h-screen bg-[#09090b]">
                <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none" />
                <Navbar />

                <main className="relative z-10 pt-24 pb-16 px-6">
                    <div className="max-w-4xl mx-auto">

                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-white mb-2">My Account</h1>
                            <p className="text-zinc-500">{profile?.display_name || 'User'}</p>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 mb-8">
                            {(['purchases', 'sales', 'profile'] as Tab[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {tab === 'purchases' && <ShoppingBag className="w-4 h-4 inline mr-2" />}
                                    {tab === 'sales' && <DollarSign className="w-4 h-4 inline mr-2" />}
                                    {tab === 'profile' && <User className="w-4 h-4 inline mr-2" />}
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Purchases Tab */}
                        {activeTab === 'purchases' && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-white">My Purchases</h2>
                                {purchases.length === 0 ? (
                                    <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                                        <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                                        <p className="text-zinc-500">No purchases yet</p>
                                        <Link href="/browse" className="text-green-400 text-sm mt-2 inline-block hover:text-green-300">
                                            Browse marketplace →
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {purchases.map((purchase) => (
                                            <div key={purchase.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                                                        <FileText className="w-6 h-6 text-zinc-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{purchase.note?.title}</p>
                                                        <p className="text-zinc-500 text-sm">{purchase.note?.course_code}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => window.open(purchase.note?.file_url, '_blank')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sales Tab */}
                        {activeTab === 'sales' && (
                            <div className="space-y-6">
                                {/* Earnings Summary */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                                    <p className="text-zinc-400 text-sm mb-1">Total Earnings</p>
                                    <p className="text-4xl font-bold text-white">${totalEarnings.toFixed(2)}</p>
                                </div>

                                <h2 className="text-lg font-medium text-white">My Listings</h2>
                                {myNotes.length === 0 ? (
                                    <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                                        <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                                        <p className="text-zinc-500">No notes listed</p>
                                        <Link href="/studio" className="text-green-400 text-sm mt-2 inline-block hover:text-green-300">
                                            Upload your first note →
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {myNotes.map((note) => (
                                            <div key={note.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                                                        <FileText className="w-6 h-6 text-zinc-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{note.title}</p>
                                                        <p className="text-zinc-500 text-sm">{note.downloads} sales</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-green-400 font-semibold">${(note.price * note.downloads).toFixed(2)}</p>
                                                    <p className="text-zinc-500 text-xs">${note.price.toFixed(2)} each</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full bg-zinc-700 flex items-center justify-center">
                                            {profile?.avatar_url ? (
                                                <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <User className="w-8 h-8 text-zinc-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold text-white">{profile?.display_name || 'User'}</p>
                                            <p className="text-zinc-500 text-sm">Member since {new Date(profile?.created_at || '').toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-zinc-800/50">
                                            <p className="text-zinc-400 text-sm">Notes Purchased</p>
                                            <p className="text-2xl font-semibold text-white">{purchases.length}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-zinc-800/50">
                                            <p className="text-zinc-400 text-sm">Notes Listed</p>
                                            <p className="text-2xl font-semibold text-white">{myNotes.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
