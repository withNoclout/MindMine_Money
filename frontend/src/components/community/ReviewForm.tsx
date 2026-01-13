"use client";

import { useState } from "react";
import { Star, ChevronRight, ChevronLeft, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewFormProps {
    noteId: string;
    noteTitle: string;
    onSubmit: (review: ReviewData) => void;
    onCancel: () => void;
}

interface ReviewData {
    rating: number;
    title: string;
    content: string;
    pros: string[];
    cons: string[];
}

export function ReviewForm({ noteId, noteTitle, onSubmit, onCancel }: ReviewFormProps) {
    const [step, setStep] = useState(1);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pros, setPros] = useState<string[]>([]);
    const [cons, setCons] = useState<string[]>([]);
    const [newPro, setNewPro] = useState("");
    const [newCon, setNewCon] = useState("");

    const totalSteps = 4;

    const addPro = () => {
        if (newPro.trim()) {
            setPros([...pros, newPro.trim()]);
            setNewPro("");
        }
    };

    const addCon = () => {
        if (newCon.trim()) {
            setCons([...cons, newCon.trim()]);
            setNewCon("");
        }
    };

    const removePro = (index: number) => setPros(pros.filter((_, i) => i !== index));
    const removeCon = (index: number) => setCons(cons.filter((_, i) => i !== index));

    const handleSubmit = () => {
        onSubmit({ rating, title, content, pros, cons });
    };

    const canProceed = () => {
        switch (step) {
            case 1: return rating > 0;
            case 2: return title.trim().length > 0 && content.trim().length > 10;
            case 3: return true; // Pros/Cons optional
            case 4: return true;
            default: return false;
        }
    };

    const stepVariants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    return (
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-lg w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Write a Review</h2>
                    <p className="text-sm text-zinc-400 mt-1">{noteTitle}</p>
                </div>
                <button
                    onClick={onCancel}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5 text-zinc-400" />
                </button>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-green-500' : 'bg-white/10'
                            }`}
                    />
                ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="min-h-[200px]"
                >
                    {/* Step 1: Rating */}
                    {step === 1 && (
                        <div className="text-center space-y-6">
                            <p className="text-zinc-300">How would you rate this note?</p>
                            <div className="flex items-center justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(star)}
                                        className="cursor-pointer"
                                    >
                                        <Star
                                            className={`w-10 h-10 transition-colors ${star <= (hoverRating || rating)
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-zinc-600'
                                                }`}
                                        />
                                    </motion.button>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-500">
                                {rating === 0 && "Select a rating"}
                                {rating === 1 && "Poor"}
                                {rating === 2 && "Fair"}
                                {rating === 3 && "Good"}
                                {rating === 4 && "Very Good"}
                                {rating === 5 && "Excellent"}
                            </p>
                        </div>
                    )}

                    {/* Step 2: Title & Content */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Review Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Summarize your experience"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Your Review</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="What did you like or dislike? How did this note help you study?"
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Pros & Cons */}
                    {step === 3 && (
                        <div className="grid grid-cols-2 gap-4">
                            {/* Pros */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-green-400">Pros (Optional)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newPro}
                                        onChange={(e) => setNewPro(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addPro()}
                                        placeholder="Add a pro"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50"
                                    />
                                    <button onClick={addPro} className="p-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors cursor-pointer">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {pros.map((pro, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-green-500/10 rounded-lg px-3 py-2 text-sm text-green-300">
                                            <span className="flex-1">+ {pro}</span>
                                            <button onClick={() => removePro(i)} className="text-green-400/50 hover:text-green-400 cursor-pointer">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cons */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-red-400">Cons (Optional)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newCon}
                                        onChange={(e) => setNewCon(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addCon()}
                                        placeholder="Add a con"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50"
                                    />
                                    <button onClick={addCon} className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {cons.map((con, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-red-500/10 rounded-lg px-3 py-2 text-sm text-red-300">
                                            <span className="flex-1">− {con}</span>
                                            <button onClick={() => removeCon(i)} className="text-red-400/50 hover:text-red-400 cursor-pointer">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Preview */}
                    {step === 4 && (
                        <div className="space-y-4">
                            <p className="text-sm text-zinc-400 mb-4">Review your submission:</p>
                            <div className="bg-zinc-800/50 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}`}
                                        />
                                    ))}
                                </div>
                                <h4 className="font-semibold text-white">{title}</h4>
                                <p className="text-sm text-zinc-400">{content}</p>
                                {pros.length > 0 && (
                                    <div className="text-sm text-green-300">
                                        {pros.map((p, i) => <span key={i} className="mr-2">+ {p}</span>)}
                                    </div>
                                )}
                                {cons.length > 0 && (
                                    <div className="text-sm text-red-300">
                                        {cons.map((c, i) => <span key={i} className="mr-2">− {c}</span>)}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors cursor-pointer ${step === 1
                            ? 'text-zinc-600 cursor-not-allowed'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>

                {step < totalSteps ? (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(step + 1)}
                        disabled={!canProceed()}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-colors cursor-pointer ${canProceed()
                                ? 'bg-green-500 text-black hover:bg-green-400'
                                : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                            }`}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                ) : (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        className="px-6 py-2 rounded-xl font-medium bg-green-500 text-black hover:bg-green-400 transition-colors cursor-pointer"
                    >
                        Submit Review
                    </motion.button>
                )}
            </div>
        </div>
    );
}
