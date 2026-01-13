"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, FileText } from 'lucide-react';

// Dynamically import react-pdf components with SSR disabled
// This prevents the "DOMMatrix is not defined" error
const Document = dynamic(
    () => import('react-pdf').then((mod) => mod.Document),
    { ssr: false }
);

const Page = dynamic(
    () => import('react-pdf').then((mod) => mod.Page),
    { ssr: false }
);

// Configure PDF worker (only runs on client)
if (typeof window !== 'undefined') {
    import('react-pdf').then((pdfjs) => {
        pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.mjs`;
    });
}

interface PdfThumbnailProps {
    fileUrl: string;
}

export function PdfThumbnail({ fileUrl }: PdfThumbnailProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Don't render on server
    if (typeof window === 'undefined') {
        return (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                <FileText className="w-8 h-8 text-zinc-600" />
            </div>
        );
    }

    return (
        <div className="w-full h-full relative bg-zinc-800 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <Document
                file={fileUrl}
                loading={
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                        <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
                    </div>
                }
                onLoadError={() => setError(true)}
                className="w-full h-full"
            >
                <Page
                    pageNumber={1}
                    width={300}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="w-full h-full object-cover"
                />
            </Document>

            {/* Overlay to prevent interaction */}
            <div className="absolute inset-0 z-10 bg-transparent" />
        </div>
    );
}

