"use client";

import { useState, useEffect } from "react";
import { NoteCard } from "@/components/marketplace/NoteCard";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/ui/PageTransition";
import { fetchNotes } from "@/lib/supabase/notes";
import { Note } from "@/types/database";
import { TrendingUp, Package, Star, Search, SlidersHorizontal, Loader2 } from "lucide-react";
import Script from "next/script";

export default function BrowsePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNotes() {
            const data = await fetchNotes();
            setNotes(data);
            setLoading(false);
        }
        loadNotes();
    }, []);

    // Filter notes by search query
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.course_code?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

            <div className="min-h-screen bg-[#09090b]">
                {/* Background Grid */}
                <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none" />

                {/* Navigation */}
                <Navbar />

                {/* Main Content */}
                <PageTransition>
                    <main className="relative z-10 pt-24 pb-16 px-6">
                        <div className="max-w-6xl mx-auto">

                            {/* Header */}
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-4">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Live Marketplace
                                </div>
                                <h1 className="text-4xl font-semibold text-white mb-3">Lecture Notes Marketplace</h1>
                                <p className="text-zinc-400 max-w-lg mx-auto">
                                    Discover high-quality, AI-verified notes from top students at your university
                                </p>
                            </div>

                            {/* Stats Bar */}
                            <div className="flex items-center justify-center gap-8 mb-10">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/50 border border-white/5">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                        <Package className="w-4 h-4 text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">2,847</div>
                                        <div className="text-[10px] text-zinc-500">Notes</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/50 border border-white/5">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <TrendingUp className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">+124</div>
                                        <div className="text-[10px] text-zinc-500">This Week</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/50 border border-white/5">
                                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">4.8</div>
                                        <div className="text-[10px] text-zinc-500">Avg Score</div>
                                    </div>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="max-w-2xl mx-auto mb-12">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        type="text"
                                        placeholder="Search courses, topics, or sellers..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900/50 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                        <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Notes Section */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-medium text-white">Featured Notes</h2>
                                    <span className="text-sm text-zinc-500">{filteredNotes.length} results</span>
                                </div>

                                {/* Notes Grid */}
                                {loading ? (
                                    <div className="flex justify-center py-12">
                                        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
                                    </div>
                                ) : filteredNotes.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredNotes.map((note) => (
                                            <NoteCard
                                                key={note.id}
                                                id={note.id}
                                                title={note.title}
                                                courseCode={note.course_code || ''}
                                                price={note.price}
                                                qualityScore={note.quality_score}
                                                thumbnailUrl={note.thumbnail_url || ''}
                                                seller={{
                                                    name: note.seller?.display_name || 'Anonymous',
                                                    avatar: note.seller?.avatar_url || ''
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-12 rounded-2xl bg-zinc-900/30 border border-white/5">
                                        <Package className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                                        <p className="text-zinc-500">No notes found</p>
                                        <p className="text-zinc-600 text-sm mt-1">Be the first to upload!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </PageTransition>
            </div>
        </>
    );
}
