"use client";

import { useState } from "react";
import {
    Bold, Italic, Underline, Strikethrough, List, ListOrdered,
    Code, Quote, Heading1, Heading2, Heading3, Link, Image,
    Save, Upload, FileText, MoreHorizontal, Undo, Redo
} from "lucide-react";
import { motion } from "framer-motion";

interface ToolbarProps {
    onAction: (action: string) => void;
    onSave?: () => void;
    onPublish?: () => void;
    isSaving?: boolean;
}

export function Toolbar({ onAction, onSave, onPublish, isSaving }: ToolbarProps) {
    const tools = [
        {
            group: "history", items: [
                { icon: Undo, action: "undo", label: "Undo" },
                { icon: Redo, action: "redo", label: "Redo" }
            ]
        },
        {
            group: "headings", items: [
                { icon: Heading1, action: "h1", label: "Heading 1" },
                { icon: Heading2, action: "h2", label: "Heading 2" },
                { icon: Heading3, action: "h3", label: "Heading 3" }
            ]
        },
        {
            group: "format", items: [
                { icon: Bold, action: "bold", label: "Bold" },
                { icon: Italic, action: "italic", label: "Italic" },
                { icon: Underline, action: "underline", label: "Underline" },
                { icon: Strikethrough, action: "strike", label: "Strikethrough" }
            ]
        },
        {
            group: "lists", items: [
                { icon: List, action: "bullet-list", label: "Bullet List" },
                { icon: ListOrdered, action: "number-list", label: "Numbered List" }
            ]
        },
        {
            group: "blocks", items: [
                { icon: Quote, action: "quote", label: "Quote" },
                { icon: Code, action: "code", label: "Code Block" }
            ]
        },
        {
            group: "media", items: [
                { icon: Link, action: "link", label: "Insert Link" },
                { icon: Image, action: "image", label: "Insert Image" }
            ]
        }
    ];

    return (
        <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Tool Groups */}
                <div className="flex items-center gap-1">
                    {tools.map((group, gi) => (
                        <div key={group.group} className="flex items-center">
                            {group.items.map((tool) => (
                                <motion.button
                                    key={tool.action}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onAction(tool.action)}
                                    title={tool.label}
                                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <tool.icon className="w-4 h-4" />
                                </motion.button>
                            ))}
                            {gi < tools.length - 1 && (
                                <div className="w-px h-6 bg-white/10 mx-2" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save Draft'}
                    </button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onPublish}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-green-500 text-black hover:bg-green-400 transition-colors cursor-pointer"
                    >
                        <Upload className="w-4 h-4" />
                        Publish
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

interface RichTextEditorProps {
    initialContent?: string;
    placeholder?: string;
    onChange?: (content: string) => void;
}

export function RichTextEditor({
    initialContent = "",
    placeholder = "Start writing your notes...",
    onChange
}: RichTextEditorProps) {
    const [content, setContent] = useState(initialContent);
    const [isSaving, setIsSaving] = useState(false);

    const handleAction = (action: string) => {
        // In a real implementation, this would use a library like TipTap, Slate, or Draft.js
        // For now, this is a UI mockup
        console.log('Editor action:', action);
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const handlePublish = () => {
        console.log('Publishing note...');
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        onChange?.(e.target.value);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Toolbar
                onAction={handleAction}
                onSave={handleSave}
                onPublish={handlePublish}
                isSaving={isSaving}
            />

            <div className="flex-1 max-w-4xl mx-auto w-full px-8 py-12">
                {/* Title Input */}
                <input
                    type="text"
                    placeholder="Untitled Note"
                    className="w-full text-4xl font-bold text-white bg-transparent border-none outline-none placeholder:text-zinc-600 mb-8"
                />

                {/* Editor Area */}
                <textarea
                    value={content}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full min-h-[60vh] text-lg text-zinc-300 bg-transparent border-none outline-none resize-none placeholder:text-zinc-600 leading-relaxed"
                />
            </div>

            {/* Status Bar */}
            <div className="sticky bottom-0 bg-zinc-900/95 backdrop-blur-xl border-t border-white/5 px-4 py-2">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-4">
                        <span>{content.split(/\s+/).filter(Boolean).length} words</span>
                        <span>{content.length} characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Last saved: Just now</span>
                        <span className="w-2 h-2 rounded-full bg-green-500" title="Auto-saved" />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface TemplateSelectorProps {
    onSelect: (template: string) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
    const templates = [
        { id: "blank", name: "Blank Note", icon: FileText, description: "Start from scratch" },
        { id: "lecture", name: "Lecture Notes", icon: FileText, description: "Structured format for lectures" },
        { id: "study-guide", name: "Study Guide", icon: FileText, description: "Key concepts and summaries" },
        { id: "cheat-sheet", name: "Cheat Sheet", icon: FileText, description: "Quick reference format" },
        { id: "outline", name: "Outline", icon: FileText, description: "Hierarchical structure" }
    ];

    return (
        <div className="bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Choose a Template</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {templates.map((template) => (
                    <motion.button
                        key={template.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(template.id)}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/30 hover:bg-white/10 transition-all text-left cursor-pointer group"
                    >
                        <template.icon className="w-8 h-8 text-green-400 mb-3" />
                        <p className="font-medium text-white group-hover:text-green-400 transition-colors">
                            {template.name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">{template.description}</p>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
