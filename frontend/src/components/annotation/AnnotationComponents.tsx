"use client";

import { useState } from "react";
import {
    Highlighter, MessageSquare, Pencil, Eraser,
    ChevronDown, X, Check, Palette
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Annotation {
    id: string;
    page: number;
    type: 'highlight' | 'note' | 'drawing';
    color: string;
    content?: string;
    position: { x: number; y: number; width?: number; height?: number };
}

interface HighlightToolProps {
    selectedColor: string;
    onColorChange: (color: string) => void;
    onToolSelect: (tool: 'highlight' | 'note' | 'draw' | 'eraser' | null) => void;
    activeTool: 'highlight' | 'note' | 'draw' | 'eraser' | null;
}

export function HighlightTool({ selectedColor, onColorChange, onToolSelect, activeTool }: HighlightToolProps) {
    const [showColors, setShowColors] = useState(false);

    const colors = [
        { name: 'Yellow', value: '#fef08a' },
        { name: 'Green', value: '#86efac' },
        { name: 'Blue', value: '#93c5fd' },
        { name: 'Pink', value: '#f9a8d4' },
        { name: 'Orange', value: '#fdba74' }
    ];

    const tools = [
        { id: 'highlight', icon: Highlighter, label: 'Highlight' },
        { id: 'note', icon: MessageSquare, label: 'Add Note' },
        { id: 'draw', icon: Pencil, label: 'Draw' },
        { id: 'eraser', icon: Eraser, label: 'Eraser' }
    ];

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40">
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
                {/* Tools */}
                <div className="space-y-1">
                    {tools.map((tool) => (
                        <motion.button
                            key={tool.id}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onToolSelect(activeTool === tool.id ? null : tool.id as typeof activeTool)}
                            title={tool.label}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${activeTool === tool.id
                                    ? 'bg-green-500 text-black'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <tool.icon className="w-5 h-5" />
                        </motion.button>
                    ))}
                </div>

                {/* Color Picker */}
                <div className="border-t border-white/10 mt-2 pt-2">
                    <button
                        onClick={() => setShowColors(!showColors)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <div
                            className="w-6 h-6 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: selectedColor }}
                        />
                    </button>

                    <AnimatePresence>
                        {showColors && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute left-full ml-2 top-0 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 flex flex-col gap-1"
                            >
                                {colors.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => {
                                            onColorChange(color.value);
                                            setShowColors(false);
                                        }}
                                        title={color.name}
                                        className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 cursor-pointer ${selectedColor === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : ''
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

interface NotePopoverProps {
    annotation: Annotation;
    onSave: (content: string) => void;
    onDelete: () => void;
    onClose: () => void;
}

export function NotePopover({ annotation, onSave, onDelete, onClose }: NotePopoverProps) {
    const [content, setContent] = useState(annotation.content || "");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-50 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-64 shadow-2xl"
            style={{
                left: annotation.position.x,
                top: annotation.position.y + 20
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Note</span>
                <button
                    onClick={onClose}
                    className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Content */}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add your note..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50 resize-none"
            />

            {/* Actions */}
            <div className="flex items-center justify-between mt-3">
                <button
                    onClick={onDelete}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                    Delete
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSave(content)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500 text-black hover:bg-green-400 transition-colors cursor-pointer"
                    >
                        Save
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

interface AnnotationSidebarProps {
    annotations: Annotation[];
    onAnnotationClick: (annotation: Annotation) => void;
    onAnnotationDelete: (id: string) => void;
}

export function AnnotationSidebar({ annotations, onAnnotationClick, onAnnotationDelete }: AnnotationSidebarProps) {
    const groupedByPage = annotations.reduce((acc, ann) => {
        if (!acc[ann.page]) acc[ann.page] = [];
        acc[ann.page].push(ann);
        return acc;
    }, {} as Record<number, Annotation[]>);

    return (
        <div className="w-72 bg-zinc-900/60 backdrop-blur-md border-l border-white/5 h-full overflow-y-auto">
            <div className="p-4 border-b border-white/5">
                <h3 className="text-lg font-semibold text-white">Annotations</h3>
                <p className="text-sm text-zinc-500 mt-1">{annotations.length} annotations</p>
            </div>

            <div className="p-4 space-y-4">
                {Object.entries(groupedByPage).map(([page, pageAnnotations]) => (
                    <div key={page}>
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                            Page {page}
                        </p>
                        <div className="space-y-2">
                            {pageAnnotations.map((ann) => (
                                <motion.div
                                    key={ann.id}
                                    whileHover={{ x: 4 }}
                                    onClick={() => onAnnotationClick(ann)}
                                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: ann.color }}
                                            />
                                            <span className="text-xs text-zinc-400 capitalize">{ann.type}</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onAnnotationDelete(ann.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-all cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                    {ann.content && (
                                        <p className="text-sm text-zinc-300 mt-2 line-clamp-2">{ann.content}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}

                {annotations.length === 0 && (
                    <div className="text-center py-8">
                        <Highlighter className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-sm text-zinc-500">No annotations yet</p>
                        <p className="text-xs text-zinc-600 mt-1">Select a tool to start annotating</p>
                    </div>
                )}
            </div>
        </div>
    );
}
