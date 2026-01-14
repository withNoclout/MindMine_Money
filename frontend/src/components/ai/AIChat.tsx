"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, X, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface AIChatProps {
    noteTitle?: string;
    context?: string;
    embedded?: boolean;
}

export function AIChat({ noteTitle = "this note", context = "", embedded = false }: AIChatProps) {
    const [isOpen, setIsOpen] = useState(embedded);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: `Hi! I'm your AI study assistant. I've analyzed **${noteTitle}**. Ask me anything about it!`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsThinking(true);

        // Simulate AI "Thinking" and Stream
        setTimeout(() => {
            setIsThinking(false);
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateMockResponse(userMsg.content),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1500 + Math.random() * 1000); // Random delay 1.5-2.5s
    };

    const generateMockResponse = (query: string) => {
        // Mock responses based on keywords
        const q = query.toLowerCase();
        if (q.includes("summarize") || q.includes("summary")) {
            return "Here's a quick summary:\n\n1. **Key Concept A**: The main driver of the process.\n2. **Factor B**: Influences the outcome significantly.\n3. **Conclusion**: The overall trend is positive.\n\nWould you like me to elaborate on any point?";
        }
        if (q.includes("explain")) {
            return "Sure! That concept refers to the mechanism by which X affects Y. Think of it like a water cycle - the inputs recycle into outputs over time.";
        }
        if (q.includes("quiz") || q.includes("test")) {
            return "Ready for a quiz? Here's a question:\n\n**What is the primary function of the mitochondria in this context?**\n\nA) Energy production\nB) Protein synthesis\nC) Waste removal";
        }
        return "That's an interesting question about the note. Based on the content, I'd suggest looking at Section 3 where the author discusses this in detail. I can also generate a practice problem if you like!";
    };

    if (!isOpen && !embedded) {
        return (
            <motion.button
                layoutId="chat-window"
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.4)] text-white z-50 hover:scale-110 transition-transform cursor-pointer group"
            >
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-zinc-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                    Ask AI Assistant
                </span>
            </motion.button>
        );
    }

    return (
        <motion.div
            layoutId={embedded ? undefined : "chat-window"}
            className={`${embedded ? 'w-full h-full' : 'fixed bottom-6 right-6 w-96 h-[500px] z-50'} flex flex-col bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">MindMine AI</h3>
                        <p className="text-[10px] text-indigo-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>
                {!embedded && (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-zinc-400 hover:text-white"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.role === 'assistant'
                                ? 'bg-zinc-800 text-indigo-400 border border-white/5'
                                : 'bg-zinc-100 text-zinc-900'
                            }`}>
                            {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'assistant'
                                ? 'bg-white/5 text-zinc-200 border border-white/5 rounded-tl-none'
                                : 'bg-indigo-600 text-white rounded-tr-none shadow-lg'
                            }`}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            <span className="text-[10px] opacity-40 mt-1 block">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </motion.div>
                ))}

                {isThinking && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 text-indigo-400 border border-white/5 flex items-center justify-center">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-900 border-t border-white/5">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about this note..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-black/40 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isThinking}
                        className="absolute right-2 top-2 p-1.5 bg-indigo-600 rounded-lg text-white disabled:opacity-50 disabled:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
