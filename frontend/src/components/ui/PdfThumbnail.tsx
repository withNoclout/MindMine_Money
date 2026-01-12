"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, FileText } from 'lucide-react';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
    fileUrl: string;
}

export function PdfThumbnail({ fileUrl }: PdfThumbnailProps) {
    const [loading, setLoading] = useState(true);

    return (
        <div className="w-full h-full relative bg-zinc-800 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <Document
                file={fileUrl}
                loading={
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                        <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
                    </div>
                }
                error={
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                        <FileText className="w-8 h-8 text-zinc-600" />
                    </div>
                }
                className="w-full h-full"
            >
                <Page
                    pageNumber={1}
                    width={300} // Render at a reasonable width for thumbnail
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="w-full h-full object-cover"
                />
            </Document>

            {/* Overlay to prevent interaction and ensure it looks like a card image */}
            <div className="absolute inset-0 z-10 bg-transparent" />
        </div>
    );
}
