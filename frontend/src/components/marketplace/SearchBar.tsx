"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

export function SearchBar({
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
}: SearchBarProps) {
    return (
        <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search courses, topics, or sellers..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all"
                />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-zinc-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20 cursor-pointer"
                >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                </select>
                <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
        </div>
    );
}
