"use client";

import { ThumbsUp, ThumbsDown, MessageCircle, MoreHorizontal, Flag, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CommentCardProps {
    id: string;
    content: string;
    author: {
        name: string;
        avatar?: string;
        isSeller?: boolean;
    };
    date: string;
    upvotes: number;
    downvotes: number;
    replies?: CommentCardProps[];
    onReply?: () => void;
    depth?: number;
}

export function CommentCard({
    id,
    content,
    author,
    date,
    upvotes,
    downvotes,
    replies = [],
    onReply,
    depth = 0
}: CommentCardProps) {
    const [vote, setVote] = useState<'up' | 'down' | null>(null);
    const [showReplies, setShowReplies] = useState(depth < 2);
    const [localUpvotes, setLocalUpvotes] = useState(upvotes);
    const [localDownvotes, setLocalDownvotes] = useState(downvotes);

    const handleVote = (newVote: 'up' | 'down') => {
        if (vote === newVote) {
            setVote(null);
            if (newVote === 'up') setLocalUpvotes(upvotes);
            else setLocalDownvotes(downvotes);
        } else {
            // Undo previous vote
            if (vote === 'up') setLocalUpvotes(upvotes);
            if (vote === 'down') setLocalDownvotes(downvotes);
            // Apply new vote
            setVote(newVote);
            if (newVote === 'up') setLocalUpvotes(upvotes + 1);
            else setLocalDownvotes(downvotes + 1);
        }
    };

    const maxDepth = 3;
    const indentClass = depth > 0 ? 'ml-6 pl-4 border-l border-white/5' : '';

    return (
        <div className={`${indentClass}`}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`py-4 group ${depth === 0 ? 'border-b border-white/5' : ''}`}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${author.isSeller
                            ? 'bg-gradient-to-br from-green-400 to-emerald-600 text-black'
                            : 'bg-zinc-700 text-white'
                            }`}>
                            {author.avatar ? (
                                <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                author.name[0].toUpperCase()
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">{author.name}</span>
                                {author.isSeller && (
                                    <span className="flex items-center gap-1 text-[10px] text-zinc-950 bg-gradient-to-r from-green-400 to-emerald-500 px-2 py-0.5 rounded-full font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)]">
                                        <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                                        SELLER
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-zinc-500">{date}</span>
                        </div>
                    </div>

                    <button className="p-1 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-3 whitespace-pre-wrap">{content}</p>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleVote('up')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${vote === 'up'
                                ? 'bg-green-500/20 text-green-400'
                                : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                                }`}
                        >
                            <ThumbsUp className="w-4 h-4" />
                        </motion.button>
                        <span className="text-xs text-zinc-400 min-w-[20px] text-center">{localUpvotes - localDownvotes}</span>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleVote('down')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${vote === 'down'
                                ? 'bg-red-500/20 text-red-400'
                                : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                                }`}
                        >
                            <ThumbsDown className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {depth < maxDepth && (
                        <button
                            onClick={onReply}
                            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            Reply
                        </button>
                    )}

                    <button className="flex items-center gap-1 text-xs text-zinc-600 hover:text-red-400 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <Flag className="w-3.5 h-3.5" />
                        Report
                    </button>
                </div>
            </motion.div>

            {/* Replies */}
            {replies.length > 0 && (
                <>
                    {!showReplies && (
                        <button
                            onClick={() => setShowReplies(true)}
                            className="text-xs text-green-400 hover:underline ml-11 mb-2 cursor-pointer"
                        >
                            Show {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                        </button>
                    )}
                    {showReplies && (
                        <div className="space-y-0">
                            {replies.map((reply) => (
                                <CommentCard
                                    key={reply.id}
                                    {...reply}
                                    depth={depth + 1}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
