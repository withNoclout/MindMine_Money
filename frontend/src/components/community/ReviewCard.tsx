"use client";

import { Star, ThumbsUp, ThumbsDown, MessageCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ReviewCardProps {
    id: string;
    rating: number;
    title: string;
    content: string;
    pros: string[];
    cons: string[];
    author: {
        name: string;
        avatar?: string;
    };
    date: string;
    helpfulCount: number;
    sellerResponse?: string;
    isVerifiedPurchase?: boolean;
}

export function ReviewCard({
    id,
    rating,
    title,
    content,
    pros,
    cons,
    author,
    date,
    helpfulCount,
    sellerResponse,
    isVerifiedPurchase = true
}: ReviewCardProps) {
    const [helpful, setHelpful] = useState<'up' | 'down' | null>(null);
    const [localHelpfulCount, setLocalHelpfulCount] = useState(helpfulCount);

    const handleVote = (vote: 'up' | 'down') => {
        if (helpful === vote) {
            setHelpful(null);
            setLocalHelpfulCount(helpfulCount);
        } else {
            setHelpful(vote);
            setLocalHelpfulCount(vote === 'up' ? helpfulCount + 1 : helpfulCount - 1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold">
                        {author.avatar ? (
                            <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            author.name[0].toUpperCase()
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{author.name}</span>
                            {isVerifiedPurchase && (
                                <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Verified
                                </span>
                            )}
                        </div>
                        <span className="text-xs text-zinc-500">{date}</span>
                    </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Title & Content */}
            <h4 className="font-semibold text-white text-lg mb-2">{title}</h4>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">{content}</p>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {pros.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Pros</span>
                        <ul className="space-y-1">
                            {pros.map((pro, i) => (
                                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                    <span className="text-green-400 mt-1">+</span>
                                    {pro}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {cons.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Cons</span>
                        <ul className="space-y-1">
                            {cons.map((con, i) => (
                                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                    <span className="text-red-400 mt-1">−</span>
                                    {con}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Seller Response */}
            {sellerResponse && (
                <div className="bg-zinc-800/50 border border-green-500/20 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Seller Response</span>
                    </div>
                    <p className="text-sm text-zinc-300">{sellerResponse}</p>
                </div>
            )}

            {/* Helpful Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <span className="text-xs text-zinc-500">Was this helpful?</span>
                <div className="flex items-center gap-2">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleVote('up')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${helpful === 'up'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                            }`}
                    >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{localHelpfulCount}</span>
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleVote('down')}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${helpful === 'down'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                            }`}
                    >
                        <ThumbsDown className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
