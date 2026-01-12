"use client";

import { GraduationCap, BarChart2, Users, FileText, Plus } from "lucide-react";

export default function EducatorDashboard() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Educator Dashboard</h1>
                    <p className="text-zinc-400">Manage your course assets and verify student notes.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Plus size={18} />
                    Create New Course
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <Users size={24} />
                        </div>
                        <div>
                            <div className="text-sm text-zinc-500">Active Students</div>
                            <div className="text-2xl font-bold text-white">1,240</div>
                        </div>
                    </div>
                    <div className="text-xs text-green-400 font-medium">+12% from last month</div>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <FileText size={24} />
                        </div>
                        <div>
                            <div className="text-sm text-zinc-500">Documents Verified</div>
                            <div className="text-2xl font-bold text-white">458</div>
                        </div>
                    </div>
                    <div className="text-xs text-zinc-500">89 pending review</div>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                            <BarChart2 size={24} />
                        </div>
                        <div>
                            <div className="text-sm text-zinc-500">Total Revenue</div>
                            <div className="text-2xl font-bold text-white">$3,240.50</div>
                        </div>
                    </div>
                    <div className="text-xs text-zinc-500">Profits from premium access</div>
                </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">Recent Submissions</h2>
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
                </div>
                <div className="p-6">
                    <p className="text-zinc-500 text-center py-12">No recent submissions to review.</p>
                </div>
            </div>
        </div>
    );
}
