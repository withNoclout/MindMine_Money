"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/ui/PageTransition";
import { UploadModal } from "@/components/upload/UploadModal";
import { EducatorOnly } from "@/components/auth/RoleGuard";
import { Upload, DollarSign, Eye, FileText, Plus, FileCheck, Image as ImageIcon, Trash2, Star } from "lucide-react";
import { fetchNotesBySeller, deleteNote } from "@/lib/supabase/notes";
import { createClient } from "@/lib/supabase/client";
import { Note } from "@/types/database";
import Link from "next/link";
import Script from "next/script";

export default function StudioPage() {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [myNotes, setMyNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMyNotes() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const notes = await fetchNotesBySeller(user.id);
                setMyNotes(notes);
            }
            setLoading(false);
        }
        loadMyNotes();
    }, []);

    const refreshNotes = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const notes = await fetchNotesBySeller(user.id);
            setMyNotes(notes);
        }
    };

    const handleDelete = async (noteId: string) => {
        if (!confirm('Are you sure you want to delete this note?')) return;

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const success = await deleteNote(noteId, user.id);
        if (success) {
            refreshNotes();
        } else {
            alert('Failed to delete note');
        }
    };
    return (
        <EducatorOnly>
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
                            <div className="max-w-3xl mx-auto">

                                {/* Header with Compact Stats */}
                                <div className="mb-8">
                                    <h1 className="text-2xl font-semibold text-white mb-4">Creator Studio</h1>

                                    {/* Compact Stats Row */}
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-green-400" />
                                            <span className="text-zinc-400">Earned:</span>
                                            <span className="text-white font-medium">$0.00</span>
                                        </div>
                                        <div className="w-px h-4 bg-zinc-700" />
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-blue-400" />
                                            <span className="text-zinc-400">Notes:</span>
                                            <span className="text-white font-medium">0</span>
                                        </div>
                                        <div className="w-px h-4 bg-zinc-700" />
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-purple-400" />
                                            <span className="text-zinc-400">Views:</span>
                                            <span className="text-white font-medium">0</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Upload Section */}
                                <div className="p-8 rounded-2xl border-2 border-dashed border-white/10 bg-zinc-900/30 hover:border-green-500/30 hover:bg-green-500/5 transition-all cursor-pointer group">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-green-400" />
                                        </div>

                                        <h3 className="text-xl font-semibold text-white mb-2">Upload Your Notes</h3>

                                        <p className="text-zinc-500 text-sm mb-6">
                                            Drag & drop your files here, or click to browse
                                        </p>

                                        {/* Supported Formats */}
                                        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-white/5">
                                                <FileCheck className="w-4 h-4 text-red-400" />
                                                <span className="text-xs text-zinc-300">PDF</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-white/5">
                                                <FileCheck className="w-4 h-4 text-orange-400" />
                                                <span className="text-xs text-zinc-300">GoodNotes</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-white/5">
                                                <ImageIcon className="w-4 h-4 text-blue-400" />
                                                <span className="text-xs text-zinc-300">JPG / PNG</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsUploadOpen(true)}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-colors"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Select Files
                                        </button>
                                    </div>
                                </div>

                                {/* My Listings - Card Grid */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-medium text-white">My Listings</h2>
                                        <span className="text-sm text-zinc-500">{myNotes.length} items</span>
                                    </div>

                                    {loading ? (
                                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                                            <p className="text-zinc-500 text-sm">Loading...</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {/* Add New Card */}
                                            <button
                                                onClick={() => setIsUploadOpen(true)}
                                                className="aspect-square rounded-xl border-2 border-dashed border-white/10 bg-zinc-900/30 hover:border-green-500/30 hover:bg-green-500/5 transition-all flex flex-col items-center justify-center gap-2 group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Plus className="w-5 h-5 text-green-400" />
                                                </div>
                                                <span className="text-sm text-zinc-400 group-hover:text-green-400 transition-colors">Add Note</span>
                                            </button>

                                            {/* Note Cards */}
                                            {myNotes.map((note) => (
                                                <div key={note.id} className="aspect-square rounded-xl bg-zinc-900/50 border border-white/5 overflow-hidden group relative hover:border-white/10 transition-all">
                                                    {/* Thumbnail */}
                                                    <div className="h-2/3 bg-zinc-800 flex items-center justify-center">
                                                        {note.thumbnail_url ? (
                                                            <img src={note.thumbnail_url} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <FileText className="w-8 h-8 text-zinc-600" />
                                                        )}
                                                    </div>

                                                    {/* Info */}
                                                    <div className="h-1/3 p-2">
                                                        <p className="text-white text-xs font-medium truncate">{note.title}</p>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <span className="text-green-400 text-xs font-semibold">${note.price.toFixed(2)}</span>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                                <span className="text-zinc-400 text-xs">{note.quality_score}%</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Hover Overlay with Delete */}
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                        <Link
                                                            href={`/browse/${note.id}`}
                                                            className="px-3 py-1.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                                                        >
                                                            View
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(note.id)}
                                                            className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                    </PageTransition>

                    {/* Upload Modal */}
                    <UploadModal
                        isOpen={isUploadOpen}
                        onClose={() => setIsUploadOpen(false)}
                        onSuccess={refreshNotes}
                    />
                </div>
            </>
        </EducatorOnly>
    );
}
