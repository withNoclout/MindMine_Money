"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Image, Smile, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'seller';
    timestamp: string;
    status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
    id: string;
    seller: {
        name: string;
        avatar?: string;
        isOnline?: boolean;
    };
    noteTitle: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
}

interface ConversationListProps {
    conversations: Conversation[];
    activeId?: string;
    onSelect: (id: string) => void;
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-white/5">
                <h2 className="text-lg font-semibold text-white">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                    <motion.button
                        key={conv.id}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                        onClick={() => onSelect(conv.id)}
                        className={`w-full p-4 flex items-start gap-3 border-b border-white/5 text-left cursor-pointer transition-colors ${activeId === conv.id ? 'bg-white/5' : ''
                            }`}
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold">
                                {conv.seller.avatar ? (
                                    <img src={conv.seller.avatar} alt={conv.seller.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    conv.seller.name[0].toUpperCase()
                                )}
                            </div>
                            {conv.seller.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-white truncate">{conv.seller.name}</span>
                                <span className="text-xs text-zinc-500">{conv.lastMessageTime}</span>
                            </div>
                            <p className="text-xs text-zinc-500 truncate mb-1">Re: {conv.noteTitle}</p>
                            <p className="text-sm text-zinc-400 truncate">{conv.lastMessage}</p>
                        </div>

                        {/* Unread Badge */}
                        {conv.unread > 0 && (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-black">{conv.unread}</span>
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.sender === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${isUser
                        ? 'bg-green-500 text-black rounded-br-md'
                        : 'bg-zinc-800 text-white rounded-bl-md'
                    }`}
            >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={`flex items-center gap-1 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span className={`text-[10px] ${isUser ? 'text-black/60' : 'text-zinc-500'}`}>
                        {message.timestamp}
                    </span>
                    {isUser && message.status && (
                        <span className={`text-[10px] ${isUser ? 'text-black/60' : 'text-zinc-500'}`}>
                            {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

interface MessageInputProps {
    onSend: (message: string) => void;
    placeholder?: string;
}

export function MessageInput({ onSend, placeholder = "Type a message..." }: MessageInputProps) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (message.trim()) {
            onSend(message.trim());
            setMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    }, [message]);

    return (
        <div className="p-4 border-t border-white/5 bg-zinc-900/50">
            <div className="flex items-end gap-2">
                {/* Attachment Buttons */}
                <div className="flex items-center gap-1">
                    <button className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                        <Image className="w-5 h-5" />
                    </button>
                </div>

                {/* Input */}
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        rows={1}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-12 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50 transition-colors resize-none max-h-[120px]"
                    />
                    <button className="absolute right-2 bottom-2 p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                        <Smile className="w-5 h-5" />
                    </button>
                </div>

                {/* Send Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className={`p-3 rounded-xl transition-colors cursor-pointer ${message.trim()
                            ? 'bg-green-500 text-black hover:bg-green-400'
                            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        }`}
                >
                    <Send className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}
