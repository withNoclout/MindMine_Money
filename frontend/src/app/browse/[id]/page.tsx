"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { fetchNoteById } from "@/lib/supabase/notes";
import { createClient } from "@/lib/supabase/client";
import { Note, Purchase } from "@/types/database";
import { FileText, User, Star, Download, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { PdfPreview } from "@/components/ui/PdfPreview";
import { VideoSection } from "@/components/ui/VideoSection";
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

            <div className="min-h-screen bg-[#09090b] overflow-x-hidden">
                <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none" />
                <Navbar />

                <main className="relative z-10 pt-24 pb-16">
                    <div className="max-w-7xl mx-auto px-6 mb-12">
                        {/* Back Button */}
                        <Link
                            href="/browse"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Marketplace
                        </Link>

                        {/* Top Header Section */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/5">
                            {/* Left: Metadata */}
                            <div className="space-y-4 max-w-2xl">
                                <div>
                                    {note.course_code && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-green-400 text-xs font-medium mb-3 border border-white/5">
                                            {note.course_code}
                                        </span>
                                    )}
                                    <h1 className="text-4xl font-bold text-white tracking-tight">{note.title}</h1>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        {note.seller?.avatar_url ? (
                                            <img src={note.seller.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                                                <User className="w-3 h-3 text-zinc-400" />
                                            </div>
                                        )}
                                        <span className="text-zinc-400 text-sm">by <span className="text-white font-medium">{note.seller?.display_name || 'Anonymous'}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-white text-sm font-medium">{note.quality_score}%</span>
                                        <span className="text-zinc-500 text-sm">Quality</span>
                                    </div>
                                    <div className="text-zinc-500 text-sm">
                                        {note.downloads} downloads
                                    </div>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-6 bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <div>
                                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Price</p>
                                    <p className="text-3xl font-bold text-white">${note.price.toFixed(2)}</p>
                                </div>
                                <div className="h-10 w-px bg-white/10" />

                                {isOwner ? (
                                    <div className="px-6 py-3 bg-zinc-800 rounded-xl text-zinc-400 font-medium">
                                        You own this note
                                    </div>
                                ) : isPurchased ? (
                                    <button
                                        onClick={handleDownload}
                                        className="px-8 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download PDF
                                    </button>
                                ) : currentUser ? (
                                    <button
                                        onClick={handlePurchase}
                                        disabled={isPurchasing}
                                        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
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
                                        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
                                    >
                                        Login to Buy
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Immersive Viewer */}
                    <div className="w-full">
                        {note.file_url?.toLowerCase().endsWith('.pdf') ? (
                            <PdfPreview fileUrl={note.file_url} />
                        ) : (
                            <div className="max-w-4xl mx-auto aspect-[3/4] bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                                {note.thumbnail_url ? (
                                    <img
                                        src={note.thumbnail_url}
                                        alt={note.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                                        <p className="text-zinc-500 text-sm">Preview not available</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Description Section */}

                    {/* Description Section */}
                    <div className="max-w-3xl mx-auto px-6 mt-16">
                        <h3 className="text-xl font-semibold text-white mb-4">About this note</h3>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            {note.description || "No description provided."}
                        </p>
                    </div>

                    {/* Video Section (Mock Preview) */}
                    {(note.video_url || true) && (
                        <div className="mt-16 mb-16 px-6">
                            <VideoSection videoUrl={note.video_url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} />
                        </div>
                    )}

                </main>
            </div>
        </>
    );
}
