"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { fetchNoteById } from "@/lib/supabase/notes";
import { createClient } from "@/lib/supabase/client";
import { Note, Purchase } from "@/types/database";
import { FileText, User, Star, Download, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function NoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const noteId = params.id as string;

    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPurchased, setIsPurchased] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        async function loadNote() {
            // Get current user
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user?.id || null);

            // Fetch note
            const noteData = await fetchNoteById(noteId);
            setNote(noteData);

            // Check if already purchased
            if (user && noteData) {
                const { data: purchase } = await supabase
                    .from('purchases')
                    .select('id')
                    .eq('buyer_id', user.id)
                    .eq('note_id', noteId)
                    .single();

                setIsPurchased(!!purchase);
            }

            setLoading(false);
        }
        loadNote();
    }, [noteId]);

    const handlePurchase = async () => {
        if (!currentUser || !note) return;

        setIsPurchasing(true);

        try {
            const supabase = createClient();

            // For now, create purchase directly (no Stripe yet)
            const { error } = await supabase
                .from('purchases')
                .insert({
                    buyer_id: currentUser,
                    note_id: note.id,
                    amount: note.price
                });

            if (error) throw error;

            setIsPurchased(true);
        } catch (err) {
            console.error('Purchase error:', err);
            alert('Failed to complete purchase. Please try again.');
        } finally {
            setIsPurchasing(false);
        }
    };

    const handleDownload = () => {
        if (note?.file_url) {
            window.open(note.file_url, '_blank');
        }
    };

    if (loading) {
        return (
            <>
                <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
                <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
                </div>
            </>
        );
    }

    if (!note) {
        return (
            <>
                <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
                <div className="min-h-screen bg-[#09090b]">
                    <Navbar />
                    <main className="pt-24 px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                            <h1 className="text-2xl font-semibold text-white mb-2">Note Not Found</h1>
                            <p className="text-zinc-500 mb-6">This note may have been removed or doesn't exist.</p>
                            <Link href="/browse" className="text-green-400 hover:text-green-300">
                                ← Back to Marketplace
                            </Link>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    const isOwner = currentUser === note.seller_id;

    return (
        <>
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

            <div className="min-h-screen bg-[#09090b]">
                <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none" />
                <Navbar />

                <main className="relative z-10 pt-24 pb-16 px-6">
                    <div className="max-w-4xl mx-auto">

                        {/* Back Button */}
                        <Link
                            href="/browse"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Marketplace
                        </Link>

                        <div className="grid md:grid-cols-2 gap-8">

                            {/* Preview */}
                            <div className="aspect-[3/4] bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center">
                                {note.thumbnail_url ? (
                                    <img
                                        src={note.thumbnail_url}
                                        alt={note.title}
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                                        <p className="text-zinc-500 text-sm">Preview not available</p>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-6">
                                {/* Title & Course */}
                                <div>
                                    {note.course_code && (
                                        <span className="text-green-400 text-sm font-medium">{note.course_code}</span>
                                    )}
                                    <h1 className="text-3xl font-semibold text-white mt-1">{note.title}</h1>
                                </div>

                                {/* Quality Score */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-yellow-400 text-sm font-medium">{note.quality_score}% Quality</span>
                                    </div>
                                    <span className="text-zinc-500 text-sm">{note.downloads} downloads</span>
                                </div>

                                {/* Description */}
                                {note.description && (
                                    <p className="text-zinc-400 leading-relaxed">{note.description}</p>
                                )}

                                {/* Seller */}
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                                        {note.seller?.avatar_url ? (
                                            <img src={note.seller.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-zinc-400" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{note.seller?.display_name || 'Anonymous'}</p>
                                        <p className="text-zinc-500 text-sm">Seller</p>
                                    </div>
                                </div>

                                {/* Price & Actions */}
                                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-zinc-400">Price</span>
                                        <span className="text-3xl font-bold text-white">${note.price.toFixed(2)}</span>
                                    </div>

                                    {isOwner ? (
                                        <p className="text-zinc-500 text-center text-sm">This is your note</p>
                                    ) : isPurchased ? (
                                        <button
                                            onClick={handleDownload}
                                            className="w-full py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-5 h-5" />
                                            Download Notes
                                        </button>
                                    ) : currentUser ? (
                                        <button
                                            onClick={handlePurchase}
                                            disabled={isPurchasing}
                                            className="w-full py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isPurchasing ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-5 h-5" />
                                                    Buy Now
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Login to Purchase
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
