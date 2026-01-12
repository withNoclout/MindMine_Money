"use client";

import { useState, useRef, MouseEvent } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, ZoomIn, ZoomOut } from 'lucide-react';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
    fileUrl: string;
}

export function PdfPreview({ fileUrl }: PdfPreviewProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);

    // Drag to scroll state
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
        // Center scroll specifically to the start of the second set after a brief delay to ensure rendering
        setTimeout(() => {
            if (containerRef.current) {
                const { scrollWidth } = containerRef.current;
                containerRef.current.scrollLeft = scrollWidth / 3; // Start at first page of second set (approx)
            }
        }, 100);
    }

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();

        // Delta-based scrolling
        const walk = e.movementX * 2;
        containerRef.current.scrollLeft -= walk;

        // Infinite Loop Logic
        const { scrollLeft, scrollWidth } = containerRef.current;
        const oneSetWidth = scrollWidth / 3; // Dividing by 3 because we render 3 sets for smoothness

        // If we scroll too far left (into first set), jump to middle set
        if (scrollLeft <= 50) { // Buffer of 50px
            containerRef.current.scrollLeft += oneSetWidth;
        }
        // If we scroll too far right (into third set), jump to middle set
        else if (scrollLeft >= oneSetWidth * 2) {
            containerRef.current.scrollLeft -= oneSetWidth;
        }
    };

    const pages = Array.from(new Array(numPages), (_, i) => i + 1);
    // Render 3 sets for robust infinite scrolling: [Buffer Left] [Main Content] [Buffer Right]
    const loopPages = [...pages, ...pages, ...pages];

    return (
        <div className="flex flex-col items-center w-full relative">
            {/* Controls (Floating) */}
            <div className="absolute top-4 right-8 flex items-center gap-4 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 z-30 transition-opacity hover:opacity-100 opacity-0 group-hover:opacity-100">
                <button
                    onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                    className="p-1 hover:text-green-400 text-white"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>

                <span className="text-xs w-8 text-center text-white">
                    {Math.round(scale * 100)}%
                </span>

                <button
                    onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                    className="p-1 hover:text-green-400 text-white"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
            </div>

            {/* Document Container */}
            <div
                ref={containerRef}
                className={`
                    group relative w-full h-[80vh] flex gap-8 overflow-x-auto overflow-y-hidden 
                    items-center px-8
                    ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                    scrollbar-hide
                `}
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                        </div>
                    }
                    error={
                        <div className="text-red-400 p-4 text-center w-full mt-10">
                            Failed to load PDF. Please try downloading it instead.
                        </div>
                    }
                    className="flex flex-row gap-8"
                >
                    {loopPages.map((pageNum, index) => (
                        <div key={`page_${index}_${pageNum}`} className="flex-shrink-0 shadow-2xl transition-transform hover:scale-[1.01] select-none">
                            <Page
                                pageNumber={pageNum}
                                scale={scale}
                                height={window.innerHeight * 0.7} // Responsive height (70vh)
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="bg-white rounded-sm"
                            />
                            <div className="text-center mt-4 text-zinc-500 text-sm font-medium tracking-wider">
                                {pageNum} / {numPages}
                            </div>
                        </div>
                    ))}
                </Document>
            </div>

            <p className="mt-6 text-zinc-500 text-sm flex items-center gap-2 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Drag to explore pages
            </p>
        </div>
    );
}
