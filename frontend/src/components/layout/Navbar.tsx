"use client";

import { Bell, Search, User } from "lucide-react";

export function Navbar() {
    return (
        <header className="h-16 fixed top-0 right-0 left-64 border-b border-white/10 glass-dark z-30 flex items-center justify-between px-8">
            {/* Search Bar */}
            <div className="flex items-center w-full max-w-md relative group">
                <Search className="absolute left-3 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search for courses, topics, or educators..."
                    className="w-full bg-black/20 border border-white/5 focus:border-primary/50 text-sm text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-600"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <button className="relative text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white">Alex Student</p>
                        <p className="text-xs text-gray-500">Student Account</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
