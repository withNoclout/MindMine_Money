"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import Script from "next/script";
import {
    ArrowRight,
    PlayCircle,
    Star,
    TrendingUp,
    Image,
    Check,
    Brain,
    Zap,
    UploadCloud,
    ScanLine,
    Wallet,
    BrainCircuit
} from "lucide-react";

// Note subjects for cycling
const NOTES = [
    { title: "Econ 101 - Ch.5", lines: ["• Supply & Demand curves", "• Market equilibrium", "★ Price elasticity!"], price: "12.99" },
    { title: "Biology 201", lines: ["• Cell membrane structure", "• Mitosis phases", "★ DNA replication!"], price: "14.50" },
    { title: "Calculus II", lines: ["• Integration techniques", "• U-substitution", "★ Taylor series!"], price: "11.99" },
    { title: "CS 201 - DSA", lines: ["• Binary search trees", "• Time complexity", "★ Big O notation!"], price: "15.00" },
];

export default function LandingPage() {
    const [typewriterText, setTypewriterText] = useState("");
    const [noteIndex, setNoteIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    // Typewriter effect
    useEffect(() => {
        const words = ['Cash', 'Income', 'Freedom', 'Coffee Money'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout | null = null;

        const type = () => {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                setTypewriterText(currentWord.substring(0, charIndex - 1));
                charIndex--;
            } else {
                setTypewriterText(currentWord.substring(0, charIndex + 1));
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                timeoutId = setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            const speed = isDeleting ? 50 : 100;
            timeoutId = setTimeout(type, speed);
        };

        type();

        // Cleanup function to prevent memory leaks
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    // Note cycling effect with enter/exit animation
    useEffect(() => {
        const interval = setInterval(() => {
            // Start exit animation
            setIsExiting(true);

            // After exit animation completes, change note and start enter
            setTimeout(() => {
                setNoteIndex((prev) => (prev + 1) % NOTES.length);
                setIsExiting(false);
            }, 600); // Match paperExit duration
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentNote = NOTES[noteIndex];

    return (
        <>
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

            <div className="min-h-screen bg-[#09090b] text-white">
                {/* Background Grid */}
                <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none" />

                {/* Navigation */}
                <Navbar showTabs={false} />

                {/* Hero Section */}
                <main className="relative z-10 pt-32 pb-20">
                    <section className="max-w-6xl mx-auto px-6 min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12">

                        {/* Hero Text */}
                        <div className="w-full md:w-1/2 space-y-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Now available for University students
                            </div>

                            <div className="relative">
                                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
                                    Turn your <br />
                                    <span className="text-zinc-500">Lecture Notes</span> <br />
                                    into {typewriterText}<span className="cursor-blink text-zinc-400">|</span>
                                </h1>

                                {/* Handwritten Note */}
                                <div className="absolute -right-4 top-0 hidden md:block transform rotate-12">
                                    <div className="font-hand text-zinc-400 text-xl flex flex-col items-center">
                                        <span className="text-green-500">$$$</span>
                                        <svg className="w-16 h-16 text-zinc-500 mt-16 transform scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <p className="text-lg text-zinc-400 max-w-md">
                                The <span className="text-white font-medium">AI-powered</span> marketplace where your <span className="text-white font-medium">neat handwriting</span> pays for your coffee.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/login" className="group px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    Start Selling Notes
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button className="px-6 py-3 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                                    <PlayCircle className="w-4 h-4" />
                                    Watch Demo
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-8 pt-4">
                                <div>
                                    <div className="text-2xl font-semibold text-white">$2.4M</div>
                                    <div className="text-sm text-zinc-500">Paid to students</div>
                                </div>
                                <div className="w-px h-10 bg-zinc-800" />
                                <div>
                                    <div className="text-2xl font-semibold text-white">50K+</div>
                                    <div className="text-sm text-zinc-500">Notes sold</div>
                                </div>
                                <div className="w-px h-10 bg-zinc-800" />
                                <div>
                                    <div className="text-2xl font-semibold text-white">4.9</div>
                                    <div className="text-sm text-zinc-500 flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        Rating
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Visual - 3D Card Stack */}
                        <div className="w-full md:w-1/2 relative h-[500px] hidden md:block">

                            {/* Floating UI Elements */}
                            <div className="absolute top-0 right-0 w-48 p-4 bg-zinc-900/80 backdrop-blur border border-white/10 rounded-xl shadow-xl z-30 float-anim">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-400">This week</div>
                                        <div className="text-lg font-semibold text-white">+$347.50</div>
                                    </div>
                                </div>
                                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                                </div>
                            </div>

                            {/* Main Note Card - with paper flow animation */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className={`w-72 h-96 bg-[#fffef0] rounded-lg shadow-2xl p-6 relative border-4 border-white ${isExiting ? 'paper-exit' : 'paper-enter'}`}>
                                    <div className="font-hand text-zinc-800">
                                        <div className="text-2xl border-b border-zinc-200 pb-2 mb-4">{currentNote.title}</div>
                                        <div className="space-y-2 text-lg text-zinc-600">
                                            <p>{currentNote.lines[0]}</p>
                                            <p>{currentNote.lines[1]}</p>
                                            <p className="flex items-center gap-2">
                                                <span className="text-red-500">★</span> {currentNote.lines[2].replace("★ ", "")}
                                            </p>
                                        </div>

                                        <div className="mt-6 border-2 border-dashed border-zinc-200 rounded-lg h-24 flex items-center justify-center">
                                            <Image className="w-8 h-8 text-zinc-300" />
                                        </div>
                                    </div>

                                    {/* Verified Badge */}
                                    <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <Check className="w-3 h-3" />
                                        VERIFIED
                                    </div>

                                    {/* Price Tag */}
                                    <div className="absolute -bottom-4 -left-4 bg-zinc-900 text-white px-4 py-2 rounded-lg shadow-xl font-semibold flex items-center gap-2">
                                        <span className="text-green-400">$</span>
                                        <span className="text-xl">{currentNote.price}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Background cards for depth - with paper flip animation */}
                            <div className="absolute top-1/2 left-1/2 w-72 h-96 bg-zinc-800 rounded-lg shadow-xl paper-flip-1" />
                            <div className="absolute top-1/2 left-1/2 w-72 h-96 bg-zinc-700 rounded-lg shadow-xl paper-flip-2" />

                            {/* AI Processing indicator */}
                            <div className="absolute bottom-10 left-0 p-4 bg-zinc-900/80 backdrop-blur border border-white/10 rounded-xl shadow-xl z-30 float-anim" style={{ animationDelay: "1.5s" }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center animate-pulse">
                                        <Brain className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">AI Analyzing...</div>
                                        <div className="text-xs text-zinc-400">Quality score: 94%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-32">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-medium mb-4">
                                <Zap className="w-3 h-3" />
                                Simple Process
                            </div>
                            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                                From notes to <span className="text-zinc-500">notes</span> <span className="font-hand text-green-500 text-3xl">(cash)</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Step 1 */}
                            <div className="group p-8 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="text-sm text-zinc-500 mb-2 font-medium">01</div>
                                <h3 className="text-xl font-semibold mb-3">Upload Your Notes</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Snap a photo or upload your handwritten lecture notes. Our AI handles the rest.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="group p-8 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <ScanLine className="w-6 h-6 text-purple-500" />
                                </div>
                                <div className="text-sm text-zinc-500 mb-2 font-medium">02</div>
                                <h3 className="text-xl font-semibold mb-3">AI Quality Check</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Our AI verifies readability, accuracy, and assigns a quality score for fair pricing.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="group p-8 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Wallet className="w-6 h-6 text-green-500" />
                                </div>
                                <div className="text-sm text-zinc-500 mb-2 font-medium">03</div>
                                <h3 className="text-xl font-semibold mb-3">Get Paid Instantly</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Money hits your wallet the moment someone buys. No waiting, no hassle.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Discussion Board Section */}
                    <section id="discussions" className="max-w-6xl mx-auto px-6 py-24">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-medium mb-4">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                Community Powered
                            </div>
                            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                                Learn <span className="text-zinc-500">together</span>, grow <span className="text-green-500">faster</span>
                            </h2>
                            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                                Join study groups, ask questions, and collaborate with students from universities worldwide.
                            </p>
                        </div>

                        {/* Discussion Preview Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {/* Study Group Card */}
                            <div className="group p-6 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-green-500/30 cursor-pointer">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black text-xs font-bold ring-2 ring-zinc-900">A</div>
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-black text-xs font-bold ring-2 ring-zinc-900">B</div>
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-black text-xs font-bold ring-2 ring-zinc-900">C</div>
                                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-medium ring-2 ring-zinc-900">+12</div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">ECON 101 Study Squad</h3>
                                <p className="text-sm text-zinc-500 mb-4">Harvard University • 24 members</p>
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400">Active now</span>
                                    <span>15 notes shared</span>
                                </div>
                            </div>

                            {/* Discussion Thread Card */}
                            <div className="group p-6 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-blue-500/30 cursor-pointer">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Question</span>
                                    <span className="text-xs text-zinc-500">2 hours ago</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">How to solve integration by parts?</h3>
                                <p className="text-sm text-zinc-500 mb-4 line-clamp-2">I&apos;m stuck on problem 5.3 in the calculus notes. Can someone explain the u-substitution step?</p>
                                <div className="flex items-center gap-4 text-xs text-zinc-400">
                                    <span>👍 12</span>
                                    <span>💬 8 replies</span>
                                </div>
                            </div>

                            {/* Peer Review Card */}
                            <div className="group p-6 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-yellow-500/30 cursor-pointer">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className={`w-4 h-4 ${s <= 4 ? 'fill-yellow-400' : ''}`} />
                                        ))}
                                    </div>
                                    <span className="text-xs text-zinc-500">4.8 avg</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">&quot;Best notes I&apos;ve ever bought!&quot;</h3>
                                <p className="text-sm text-zinc-500 mb-4 line-clamp-2">Clear diagrams, well-organized, and the seller even answered my questions. Highly recommend!</p>
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <span className="text-green-400">✓ Verified Purchase</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <Link href="/groups" className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all">
                                Join the Discussion
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="max-w-6xl mx-auto px-6 py-20">
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 md:p-16">
                            {/* Background glow */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                            <div className="relative z-10 text-center max-w-2xl mx-auto">
                                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                                    Ready to monetize your <span className="text-zinc-500">knowledge?</span>
                                </h2>
                                <p className="text-lg text-zinc-400 mb-8">
                                    Join thousands of students already earning from their lecture notes. It takes less than 2 minutes to start.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/login" className="group px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                        Create Student Account
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <button className="px-8 py-4 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all">
                                        I&apos;m an Educator
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-white/5 py-12">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <BrainCircuit className="w-5 h-5 text-zinc-400" />
                                <span className="text-sm text-zinc-500">© 2025 Mind Mine. All rights reserved.</span>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-zinc-500">
                                <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                                <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                                <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
