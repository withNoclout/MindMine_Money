"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    BrainCircuit,
    ArrowLeft,
    GraduationCap,
    Coins,
    ArrowRight,
    CheckCircle2,
    BarChart2,
    TrendingUp,
    Bitcoin,
    Apple,
    Mail,
    Eye,
    EyeOff
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isStudentMode, setIsStudentMode] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const toggleMode = () => {
        setIsStudentMode(!isStudentMode);
        setError("");
        setEmail("");
        setPassword("");
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "admin" && password === "admin") {
            // Mock successful login
            if (isStudentMode) {
                router.push("/student/browse");
            } else {
                router.push("/educator/dashboard"); // Placeholder redirect
            }
        } else {
            setError("Invalid credentials. Try admin/admin");
        }
    };

    return (
        <div className="mode-container bg-grid-pattern min-h-screen relative overflow-hidden bg-[#09090b] text-[#fafafa] font-sans selection:bg-zinc-800 selection:text-white">
            {/* Navigation (Absolute) */}
            <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href="/" className="flex items-center gap-2 group">
                        <BrainCircuit className="text-zinc-100 transition-transform group-hover:-rotate-12 w-6 h-6" />
                        <span className="text-lg font-semibold tracking-tighter text-white">MIND MINE</span>
                    </Link>
                </div>
                <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors pointer-events-auto flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            {/* The Moving Panels Container */}
            <div className="relative w-full h-screen">

                {/* FORM PANEL (Left initially, slides right in student mode) */}
                <div
                    className={cn(
                        "form-slider absolute top-0 left-0 w-full md:w-1/2 h-full z-20 transition-all duration-700 cubic-bezier(0.645, 0.045, 0.355, 1) bg-[#09090b] flex items-center justify-center border-white/5",
                        isStudentMode ? "md:translate-x-full md:border-l" : "md:border-r"
                    )}
                >
                    <div className="w-full max-w-md px-8 py-12 relative overflow-hidden">

                        {/* EDUCATOR FORM */}
                        <div
                            className={cn(
                                "transition-all duration-500 absolute inset-x-8 top-1/2 -translate-y-1/2",
                                isStudentMode ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 pointer-events-auto translate-y-[-50%]"
                            )}
                        >
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
                                    <GraduationCap className="w-3.5 h-3.5" />
                                    Educator Portal
                                </div>
                                <h2 className="text-3xl font-semibold tracking-tight">Welcome back, Professor.</h2>
                                <p className="text-zinc-500 mt-2 text-sm">Verify your credentials to manage course assets.</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400 ml-1">Academic Email</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="prof@university.edu"
                                        className="w-full px-4 py-3 rounded-xl text-sm bg-transparent border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400 ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 rounded-xl text-sm bg-transparent border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}

                                <div className="flex justify-between items-center text-xs">
                                    <label className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-white">
                                        <input type="checkbox" className="rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-0" />
                                        Remember device
                                    </label>
                                    <a href="#" className="text-zinc-500 hover:text-white">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full py-3 bg-white text-black font-semibold rounded-xl text-sm hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    Access Dashboard
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/5 text-center">
                                <p className="text-zinc-500 text-sm mb-4">Are you a student looking to sell notes?</p>
                                <button
                                    onClick={toggleMode}
                                    className="group px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 text-xs transition-all flex items-center justify-center gap-2 mx-auto w-full md:w-auto"
                                >
                                    Switch to Student Login
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* STUDENT FORM */}
                        <div
                            className={cn(
                                "transition-all duration-500 absolute inset-x-8 top-1/2 -translate-y-1/2",
                                isStudentMode ? "opacity-100 pointer-events-auto translate-y-[-50%]" : "opacity-0 pointer-events-none -translate-y-10"
                            )}
                        >
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-4">
                                    <Coins className="w-3.5 h-3.5" />
                                    Student Miner
                                </div>
                                <h2 className="text-3xl font-semibold tracking-tight">Start Mining Today.</h2>
                                <p className="text-zinc-500 mt-2 text-sm">Turn your tablet scribbles into liquid currency.</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="flex gap-4">
                                    <button type="button" className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex justify-center items-center gap-2 text-sm font-medium">
                                        <Apple className="w-4 h-4" />
                                        Apple
                                    </button>
                                    <button type="button" className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex justify-center items-center gap-2 text-sm font-medium">
                                        <Mail className="w-4 h-4" />
                                        Google
                                    </button>
                                </div>

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#09090b] px-2 text-zinc-500">Or continue with email</span></div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400 ml-1">University Email</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="student@edu.com"
                                        className="w-full px-4 py-3 rounded-xl text-sm bg-transparent border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400 ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 rounded-xl text-sm bg-transparent border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}

                                <button type="submit" className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                    Login to Wallet
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/5 text-center">
                                <p className="text-zinc-500 text-sm mb-4">Are you a Professor?</p>
                                <button
                                    onClick={toggleMode}
                                    className="group px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 text-xs transition-all flex items-center justify-center gap-2 mx-auto w-full md:w-auto"
                                >
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform rotate-180" />
                                    Switch to Educator Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* VISUAL PANEL (Right initially, slides left in student mode) */}
                <div
                    className={cn(
                        "visual-slider absolute top-0 left-0 md:left-1/2 w-full md:w-1/2 h-full z-10 hidden md:flex items-center justify-center overflow-hidden transition-all duration-700 cubic-bezier(0.645, 0.045, 0.355, 1)",
                        isStudentMode ? "md:-translate-x-full" : ""
                    )}
                >
                    {/* BACKGROUND BLUR ELEMENTS */}
                    <div
                        className={cn(
                            "absolute inset-0 bg-gradient-to-br from-blue-900/20 to-zinc-900 z-0 transition-opacity duration-700",
                            isStudentMode ? "opacity-0" : "opacity-100"
                        )}
                    />
                    <div
                        className={cn(
                            "absolute inset-0 bg-gradient-to-bl from-green-900/20 to-zinc-900 z-0 transition-opacity duration-700",
                            isStudentMode ? "opacity-100" : "opacity-0"
                        )}
                    />

                    {/* EDUCATOR VISUAL */}
                    <div
                        className={cn(
                            "transition-all duration-700 flex items-center justify-center w-full h-full",
                            isStudentMode ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
                        )}
                    >
                        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                            <div className="absolute w-64 h-80 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl edu-glow transform -rotate-6 z-10 p-6 flex flex-col justify-between float-slow">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 w-3/4 bg-zinc-800 rounded"></div>
                                    <div className="h-2 w-1/2 bg-zinc-800 rounded"></div>
                                    <div className="h-32 w-full bg-blue-500/5 border border-blue-500/10 rounded-lg flex items-center justify-center">
                                        <BarChart2 className="text-blue-500/50 w-12 h-12" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-zinc-500">
                                    <span>Class Performance</span>
                                    <span className="text-blue-400">98%</span>
                                </div>
                            </div>

                            <div className="absolute -right-4 top-20 w-48 p-4 bg-zinc-900/90 backdrop-blur border border-white/10 rounded-lg shadow-xl z-20 float-fast" style={{ animationDelay: "1s" }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-md text-blue-400">
                                        <CheckCircle2 className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-400">Notes Verified</div>
                                        <div className="text-sm font-semibold">1,240 Docs</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STUDENT VISUAL */}
                    <div
                        className={cn(
                            "transition-all duration-700 absolute inset-0 flex items-center justify-center w-full h-full",
                            isStudentMode ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                        )}
                    >
                        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                            <div className="absolute w-64 h-80 bg-[#ffffea] text-black border-4 border-white rounded-sm shadow-2xl student-glow transform rotate-3 z-10 p-6 float-slow">
                                <div className="font-hand text-2xl text-zinc-800 mb-4 border-b border-zinc-200 pb-2">Micro-Econ 201</div>
                                <div className="font-hand text-lg text-zinc-600 space-y-2">
                                    <p>Supply &gt; Demand = <span className="text-red-500">Price Drop!</span></p>
                                    <div className="border-2 border-dashed border-zinc-300 h-24 rounded flex items-center justify-center">
                                        <TrendingUp className="text-zinc-400 w-8 h-8" />
                                    </div>
                                    <p className="text-sm">* remember the graph for the exam!!</p>
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white font-bold px-4 py-2 rounded-full shadow-lg transform -rotate-12 border-2 border-white">
                                    SOLD $15
                                </div>
                            </div>

                            <div className="absolute top-10 right-10 bg-zinc-900 border border-white/10 p-3 rounded-full shadow-xl z-20 float-fast" style={{ animationDelay: "0.5s" }}>
                                <Bitcoin className="text-yellow-400 w-8 h-8" />
                            </div>

                            <div className="absolute bottom-20 left-0 bg-zinc-900 border border-white/10 px-4 py-2 rounded-lg shadow-xl z-20 float-fast flex items-center gap-2" style={{ animationDelay: "1.5s" }}>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-mono text-green-400">+$24.50 Received</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
