"use client";

import { Users, BookOpen, Lock, Globe, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface GroupCardProps {
    id: string;
    name: string;
    courseCode: string;
    university: string;
    memberCount: number;
    noteCount: number;
    isPublic: boolean;
    members: { avatar?: string; name: string }[];
    onJoin?: () => void;
    onView?: () => void;
}

export function GroupCard({
    id,
    name,
    courseCode,
    university,
    memberCount,
    noteCount,
    isPublic,
    members,
    onJoin,
    onView
}: GroupCardProps) {
    const displayMembers = members.slice(0, 4);
    const remainingMembers = memberCount - displayMembers.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all cursor-pointer group"
            onClick={onView}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                            {courseCode}
                        </span>
                        {isPublic ? (
                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                <Globe className="w-3 h-3" />
                                Public
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                <Lock className="w-3 h-3" />
                                Private
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-zinc-500">{university}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{memberCount} members</span>
                </div>
                <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{noteCount} notes</span>
                </div>
            </div>

            {/* Member Avatars */}
            <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                    {displayMembers.map((member, i) => (
                        <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black text-xs font-bold ring-2 ring-zinc-900"
                        >
                            {member.avatar ? (
                                <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                member.name[0].toUpperCase()
                            )}
                        </div>
                    ))}
                    {remainingMembers > 0 && (
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-medium ring-2 ring-zinc-900">
                            +{remainingMembers}
                        </div>
                    )}
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onJoin?.();
                    }}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors cursor-pointer"
                >
                    Join Group
                </motion.button>
            </div>
        </motion.div>
    );
}

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: CreateGroupData) => void;
}

interface CreateGroupData {
    name: string;
    courseCode: string;
    university: string;
    isPublic: boolean;
}

export function CreateGroupModal({ isOpen, onClose, onCreate }: CreateGroupModalProps) {
    const [name, setName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [university, setUniversity] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({ name, courseCode, university, isPublic });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4"
            >
                <h2 className="text-2xl font-bold text-white mb-6">Create Study Group</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Group Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., ECON 101 Study Squad"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Course Code</label>
                        <input
                            type="text"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            placeholder="e.g., ECON 101"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">University</label>
                        <input
                            type="text"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            placeholder="e.g., Harvard University"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                            <p className="font-medium text-white">Public Group</p>
                            <p className="text-sm text-zinc-400">Anyone can join and see group notes</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsPublic(!isPublic)}
                            className={`relative w-12 h-7 rounded-full transition-colors ${isPublic ? 'bg-green-500' : 'bg-zinc-700'
                                }`}
                        >
                            <motion.div
                                animate={{ x: isPublic ? 20 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow"
                            />
                        </button>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl font-medium bg-white/5 text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="flex-1 px-4 py-3 rounded-xl font-medium bg-green-500 text-black hover:bg-green-400 transition-colors cursor-pointer"
                        >
                            Create Group
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

// Need to import useState for CreateGroupModal
import { useState } from "react";
