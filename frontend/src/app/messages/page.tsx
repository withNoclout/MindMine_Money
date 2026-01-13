"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ConversationList, MessageBubble, MessageInput } from "@/components/messaging/MessagingComponents";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { motion } from "framer-motion";

// Mock data
const mockConversations = [
    {
        id: "1",
        seller: { name: "Alex Chen", isOnline: true },
        noteTitle: "Advanced Calculus Notes",
        lastMessage: "Sure, I can explain the integration section!",
        lastMessageTime: "2m ago",
        unread: 2
    },
    {
        id: "2",
        seller: { name: "Sarah Johnson", isOnline: false },
        noteTitle: "Organic Chemistry Summary",
        lastMessage: "Thanks for your purchase!",
        lastMessageTime: "1h ago",
        unread: 0
    },
    {
        id: "3",
        seller: { name: "Mike Lee", isOnline: true },
        noteTitle: "Data Structures Guide",
        lastMessage: "Let me know if you have any questions",
        lastMessageTime: "3h ago",
        unread: 0
    }
];

const mockMessages = [
    { id: "1", content: "Hi! I just purchased your calculus notes.", sender: "user" as const, timestamp: "10:30 AM", status: 'read' as const },
    { id: "2", content: "Hey! Thanks for the purchase! How can I help?", sender: "seller" as const, timestamp: "10:32 AM" },
    { id: "3", content: "I'm having trouble understanding the section on integration by parts. Could you explain it?", sender: "user" as const, timestamp: "10:35 AM", status: 'read' as const },
    { id: "4", content: "Sure, I can explain the integration section! The key is to remember the formula: ∫u dv = uv - ∫v du", sender: "seller" as const, timestamp: "10:38 AM" },
];

export default function MessagesPage() {
    const [activeConversation, setActiveConversation] = useState<string | null>("1");
    const [messages, setMessages] = useState(mockMessages);

    const activeConv = mockConversations.find(c => c.id === activeConversation);

    const handleSendMessage = (content: string) => {
        const newMessage = {
            id: String(messages.length + 1),
            content,
            sender: "user" as const,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent' as const
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="pt-16 h-screen flex">
                {/* Sidebar - Conversation List */}
                <div className="w-80 border-r border-white/5 bg-zinc-900/40 hidden md:block">
                    <ConversationList
                        conversations={mockConversations}
                        activeId={activeConversation || undefined}
                        onSelect={setActiveConversation}
                    />
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {activeConv ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-white/5 bg-zinc-900/40 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button className="md:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-400 cursor-pointer">
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold">
                                            {activeConv.seller.name[0]}
                                        </div>
                                        {activeConv.seller.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{activeConv.seller.name}</p>
                                        <p className="text-xs text-zinc-500">
                                            {activeConv.seller.isOnline ? 'Online' : 'Offline'} • Re: {activeConv.noteTitle}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                        <Video className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((message) => (
                                    <MessageBubble key={message.id} message={message} />
                                ))}
                            </div>

                            {/* Input */}
                            <MessageInput
                                onSend={handleSendMessage}
                                placeholder="Type a message..."
                            />
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                                    <Phone className="w-10 h-10 text-zinc-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                                <p className="text-zinc-400">Choose a seller to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
