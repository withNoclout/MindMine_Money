"use client";

import { useState, useRef } from "react";
import { X, Upload, FileCheck, Loader2 } from "lucide-react";
import { createNote } from "@/lib/supabase/notes";
import { createClient } from "@/lib/supabase/client";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [price, setPrice] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Validate file type
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(selectedFile.type)) {
                setError("Please upload a PDF or image file");
                return;
            }
            setFile(selectedFile);
            setError("");
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(droppedFile.type)) {
                setError("Please upload a PDF or image file");
                return;
            }
            setFile(droppedFile);
            setError("");
        }
    };

    const handleSubmit = async () => {
        if (!file || !title || !price) {
            setError("Please fill in all required fields");
            return;
        }

        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum < 0) {
            setError("Please enter a valid price");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setError("You must be logged in to upload");
                setIsUploading(false);
                return;
            }

            await createNote({
                title,
                description,
                course_code: courseCode,
                price: priceNum,
                file
            }, user.id);

            // Reset form
            setFile(null);
            setTitle("");
            setDescription("");
            setCourseCode("");
            setPrice("");

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to upload note. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h2 className="text-xl font-semibold text-white">Upload Notes</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Drop Zone */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${file
                                ? "border-green-500/50 bg-green-500/5"
                                : "border-white/10 hover:border-white/20 hover:bg-white/5"
                            }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {file ? (
                            <div className="flex items-center justify-center gap-3">
                                <FileCheck className="w-8 h-8 text-green-400" />
                                <div className="text-left">
                                    <p className="text-white font-medium">{file.name}</p>
                                    <p className="text-zinc-500 text-sm">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                                <p className="text-zinc-400 text-sm">Drop your file here or click to browse</p>
                                <p className="text-zinc-600 text-xs mt-1">PDF, JPG, PNG supported</p>
                            </>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1.5">Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Chapter 5 - Supply & Demand"
                            className="w-full px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1.5">Course Code</label>
                            <input
                                type="text"
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)}
                                placeholder="e.g. ECON 101"
                                className="w-full px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1.5">Price ($) *</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="12.99"
                                className="w-full px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-1.5">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of your notes..."
                            rows={3}
                            className="w-full px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 resize-none"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-white/5">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isUploading || !file || !title || !price}
                        className="px-6 py-2.5 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                Upload & List
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
