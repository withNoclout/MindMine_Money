"use client";

import * as pdfjsLib from 'pdfjs-dist';

// Set worker source (must be copied to public folder or served via CDN)
// In production, you might want to version this file
if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export async function extractTextFromPDF(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        // Load the document
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let fullText = '';
        const numPages = pdf.numPages;

        // Limit to first 10 pages for performance if needed, or process all
        const processPages = Math.min(numPages, 10);

        for (let i = 1; i <= processPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
            fullText += pageText + ' ';
        }

        return fullText.trim();
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to parse PDF text.');
    }
}
