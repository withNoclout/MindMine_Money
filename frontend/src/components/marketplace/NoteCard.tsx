"use client";

import Link from "next/link";
import { BrainCircuit, Star, User } from "lucide-react";
import { PdfThumbnail } from "@/components/ui/PdfThumbnail";

interface NoteCardProps {
    id: string;
    title: string;
    courseCode: string;
    price: number;
    qualityScore: number;
    thumbnailUrl?: string;
    fileUrl?: string; // Add fileUrl to props
    seller: {
        name: string;
        avatar?: string;
    };
}

export function NoteCard({
    id,
    title,
    courseCode,
    price,
    qualityScore,
    thumbnailUrl,
    fileUrl,
    seller,
}: NoteCardProps) {
    return (
        <Link href={`/browse/${id}`} className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_60px_rgba(34,197,94,0.1)] block">
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] bg-zinc-800 overflow-hidden">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : fileUrl && fileUrl.toLowerCase().endsWith('.pdf') ? (
                    <PdfThumbnail fileUrl={fileUrl} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                        <div className="text-center">
                            <BrainCircuit className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                            <span className="text-xs text-zinc-600">Preview</span>
                        </div>
                    </div>
                )}

                {/* Quality Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30">
                    <Star className="w-3 h-3 text-green-400 fill-green-400" />
                    <span className="text-xs font-medium text-green-400">{qualityScore}%</span>
                </div>

                {/* Course Code Pill */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10">
                    <span className="text-xs font-medium text-white">{courseCode}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h3 className="font-medium text-white text-sm line-clamp-2 group-hover:text-green-400 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center justify-between">
                    {/* Seller */}
                    <div className="flex items-center gap-2">
                        {seller.avatar ? (
                            <img
                                src={seller.avatar}
                                alt={seller.name}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center">
                                <User className="w-3 h-3 text-zinc-400" />
                            </div>
                        )}
                        <span className="text-xs text-zinc-500">{seller.name}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1">
                        <span className="text-green-400 font-semibold">$</span>
                        <span className="text-white font-semibold">{price.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Link>
    );
}
