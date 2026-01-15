"use client";

import { useState, useCallback } from 'react';
import { extractTextFromPDF } from '@/lib/pdf-utils';
import { detectTopic } from '@/lib/ai-pipeline';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader2, CheckCircle, Tag } from 'lucide-react';

interface AnalysisResult {
    topTopic: string;
    confidence: number;
    wordCount: number;
}

export default function PDFAnalyzer() {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<string>('');

    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setResult(null);
            await analyzeFile(selectedFile);
        }
    }, []);

    const analyzeFile = async (selectedFile: File) => {
        setAnalyzing(true);
        try {
            // Step 1: Extract Text
            setProgress('Extracting text from PDF (Local)...');
            const text = await extractTextFromPDF(selectedFile);
            console.log('Extracted text length:', text.length);

            if (text.length < 50) {
                throw new Error("Could not extract enough text. Is this a scanned PDF?");
            }

            // Step 2: Analyze Topic
            setProgress('Loading AI Model & Detecting Topic...');
            const topicResult = await detectTopic(text);

            if (topicResult) {
                setResult({
                    topTopic: topicResult.topTopic,
                    confidence: topicResult.confidence,
                    wordCount: text.split(/\s+/).length
                });
            }
        } catch (error) {
            console.error('Analysis failed:', error);
            setProgress('Analysis failed. check console.');
        } finally {
            setAnalyzing(false);
            setProgress('');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Smart Note Analysis</h3>
                <p className="text-sm text-gray-500">Local AI - No data leaves your device</p>
            </div>

            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 transition-colors hover:border-gray-800 text-center">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {!file && !analyzing ? (
                    <div className="flex flex-col items-center">
                        <Upload className="w-10 h-10 text-gray-400 mb-3" />
                        <span className="text-sm font-medium text-gray-600">Drop PDF here to Analyze</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <FileText className="w-10 h-10 text-blue-500 mb-3" />
                        <span className="text-sm font-medium text-gray-800">{file?.name}</span>
                    </div>
                )}
            </div>

            {analyzing && (
                <div className="mt-6 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                    <p className="text-xs text-gray-500">{progress}</p>
                </div>
            )}

            {result && !analyzing && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4"
                >
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <Tag className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Detected Topic</span>
                        </div>
                        <span className="text-sm font-bold text-green-900">{result.topTopic}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <p className="text-xs text-gray-500">Confidence</p>
                            <p className="text-sm font-semibold">{(result.confidence * 100).toFixed(1)}%</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <p className="text-xs text-gray-500">Word Count</p>
                            <p className="text-sm font-semibold">{result.wordCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 mt-2">
                        <CheckCircle className="w-3 h-3" />
                        <span>AI Analysis Complete</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
