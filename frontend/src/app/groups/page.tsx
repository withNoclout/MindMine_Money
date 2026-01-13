"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { GroupCard } from "@/components/community/GroupComponents";
import { Plus, Search, Filter, Users } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for demo
const mockGroups = [
    {
        id: "1",
        name: "ECON 101 Study Squad",
        courseCode: "ECON 101",
        university: "Harvard University",
        memberCount: 24,
        noteCount: 15,
        isPublic: true,
        members: [
            { name: "Alice" },
            { name: "Bob" },
            { name: "Charlie" },
            { name: "Diana" }
        ]
    },
    {
        id: "2",
        name: "Organic Chemistry Masters",
        courseCode: "CHEM 201",
        university: "MIT",
        memberCount: 18,
        noteCount: 32,
        isPublic: true,
        members: [
            { name: "Eve" },
            { name: "Frank" },
            { name: "Grace" }
        ]
    },
    {
        id: "3",
        name: "Data Structures Gang",
        courseCode: "CS 201",
        university: "Stanford University",
        memberCount: 45,
        noteCount: 28,
        isPublic: false,
        members: [
            { name: "Henry" },
            { name: "Ivy" },
            { name: "Jack" },
            { name: "Kate" }
        ]
    },
    {
        id: "4",
        name: "Psychology 101 Group",
        courseCode: "PSYCH 101",
        university: "UCLA",
        memberCount: 12,
        noteCount: 8,
        isPublic: true,
        members: [
            { name: "Leo" },
            { name: "Mia" }
        ]
    }
];

export default function GroupsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');

    const filteredGroups = mockGroups.filter(group => {
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' ||
            (filter === 'public' && group.isPublic) ||
            (filter === 'private' && !group.isPublic);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Users className="w-8 h-8 text-green-400" />
                                Study Groups
                            </h1>
                            <p className="text-zinc-400 mt-2">Join a group to study with classmates</p>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-green-500 text-black hover:bg-green-400 transition-colors cursor-pointer"
                        >
                            <Plus className="w-5 h-5" />
                            Create Group
                        </motion.button>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search groups by name or course..."
                                className="w-full bg-zinc-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/10 rounded-xl p-1">
                            {(['all', 'public', 'private'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${filter === f
                                            ? 'bg-green-500 text-black'
                                            : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Groups Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredGroups.map((group, index) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GroupCard
                                    {...group}
                                    onJoin={() => console.log('Join group:', group.id)}
                                    onView={() => console.log('View group:', group.id)}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredGroups.length === 0 && (
                        <div className="text-center py-16">
                            <Users className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No groups found</h3>
                            <p className="text-zinc-400">Try a different search or create your own group</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
