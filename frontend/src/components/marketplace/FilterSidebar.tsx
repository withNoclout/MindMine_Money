"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const CATEGORIES = [
    { id: "all", label: "All Courses", count: 248 },
    { id: "econ", label: "Economics", count: 89 },
    { id: "bio", label: "Biology", count: 67 },
    { id: "math", label: "Mathematics", count: 54 },
    { id: "cs", label: "Computer Science", count: 45 },
    { id: "psych", label: "Psychology", count: 38 },
    { id: "chem", label: "Chemistry", count: 32 },
    { id: "hist", label: "History", count: 28 },
];

const PRICE_RANGES = [
    { id: "all", label: "Any Price" },
    { id: "0-5", label: "Under $5" },
    { id: "5-10", label: "$5 - $10" },
    { id: "10-20", label: "$10 - $20" },
    { id: "20+", label: "$20+" },
];

interface FilterSidebarProps {
    selectedCategory: string;
    selectedPrice: string;
    onCategoryChange: (category: string) => void;
    onPriceChange: (price: string) => void;
}

export function FilterSidebar({
    selectedCategory,
    selectedPrice,
    onCategoryChange,
    onPriceChange,
}: FilterSidebarProps) {
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);

    return (
        <aside className="w-64 shrink-0 space-y-6">
            {/* Categories */}
            <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Course Categories</h3>
                <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.id
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                {selectedCategory === cat.id && (
                                    <Check className="w-4 h-4 text-green-400" />
                                )}
                                <span>{cat.label}</span>
                            </div>
                            <span className={`text-xs ${selectedCategory === cat.id ? "text-green-400/70" : "text-zinc-600"}`}>
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Price Range</h3>
                <div className="relative">
                    <button
                        onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-white/10 bg-zinc-900/50 text-sm text-white hover:border-white/20 transition-colors"
                    >
                        <span>{PRICE_RANGES.find(p => p.id === selectedPrice)?.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showPriceDropdown ? "rotate-180" : ""}`} />
                    </button>

                    {showPriceDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden z-10">
                            {PRICE_RANGES.map((range) => (
                                <button
                                    key={range.id}
                                    onClick={() => {
                                        onPriceChange(range.id);
                                        setShowPriceDropdown(false);
                                    }}
                                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${selectedPrice === range.id
                                            ? "bg-green-500/10 text-green-400"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quality Filter Toggle */}
            <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Quality</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center p-1">
                        <div className="w-4 h-4 rounded-full bg-green-500 translate-x-4 transition-transform" />
                    </div>
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                        Verified only (90%+)
                    </span>
                </label>
            </div>
        </aside>
    );
}
