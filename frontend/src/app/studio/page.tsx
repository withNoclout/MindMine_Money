"use client";

import { UserProfileButton } from "@/components/auth/UserProfileButton";
import { BrainCircuit, Upload, DollarSign, BarChart3, FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function StudioPage() {
    return (
        <div className="min-h-screen bg-[#09090b]">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#09090b]/80">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <BrainCircuit className="w-6 h-6 text-zinc-100 transition-transform group-hover:-rotate-12" />
                        <span className="text-lg font-semibold tracking-tighter text-white">MIND MINE</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link href="/browse" className="text-zinc-400 hover:text-white transition-colors">Marketplace</Link>
                        <Link href="/studio" className="text-green-400">Sell Notes</Link>
                        <Link href="#" className="text-zinc-400 hover:text-white transition-colors">My Purchases</Link>
                    </div>

                    <UserProfileButton variant="dark" />
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 pt-24 pb-16 px-6">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-4">
                            <DollarSign className="w-3 h-3" />
                            Seller Dashboard
                        </div>
                        <h1 className="text-3xl font-semibold text-white mb-2">Creator Studio</h1>
                        <p className="text-zinc-400">Upload and manage your lecture notes</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                </div>
                                <span className="text-sm text-zinc-400">Total Earnings</span>
                            </div>
                            <div className="text-3xl font-semibold text-white">$0.00</div>
                            <div className="text-xs text-zinc-500 mt-1">Start selling to earn</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="text-sm text-zinc-400">Notes Listed</span>
                            </div>
                            <div className="text-3xl font-semibold text-white">0</div>
                            <div className="text-xs text-zinc-500 mt-1">Upload your first note</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-purple-400" />
                                </div>
                                <span className="text-sm text-zinc-400">Total Views</span>
                            </div>
                            <div className="text-3xl font-semibold text-white">0</div>
                            <div className="text-xs text-zinc-500 mt-1">No views yet</div>
                        </div>
                    </div>

                    {/* Upload CTA */}
                    <div className="p-8 rounded-2xl border-2 border-dashed border-white/10 bg-zinc-900/30 text-center hover:border-green-500/30 hover:bg-green-500/5 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Upload Your First Notes</h3>
                        <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
                            Take a photo of your handwritten notes. Our AI will verify quality and help you set the right price.
                        </p>
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-colors">
                            <Plus className="w-5 h-5" />
                            Upload Notes
                        </button>
                    </div>

                    {/* My Listings (Empty State) */}
                    <div className="mt-12">
                        <h2 className="text-xl font-semibold text-white mb-4">My Listings</h2>
                        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                            <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                            <p className="text-zinc-500">You haven't listed any notes yet.</p>
                            <p className="text-zinc-600 text-sm">Upload your first note to start earning!</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
