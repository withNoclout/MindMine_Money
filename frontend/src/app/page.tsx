"use client";

import { UserProfileButton } from "@/components/auth/UserProfileButton";
import Script from "next/script";

export default function LandingPage() {
    return (
        <>
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
            <Script src="https://code.iconify.design/3/3.1.0/iconify.min.js" strategy="afterInteractive" />

            {/* Navigation - React Component */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#09090b]/80">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="iconify text-zinc-100" data-icon="lucide:brain-circuit" data-width="24"></span>
                        <span className="text-lg font-semibold tracking-tighter text-white">MIND MINE</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <a href="/browse" className="highlighter-hover transition-colors hover:text-white">Marketplace</a>
                        <a href="#" className="highlighter-hover transition-colors hover:text-white">How it works</a>
                        <a href="#" className="highlighter-hover transition-colors hover:text-white">Pricing</a>
                    </div>
                    <UserProfileButton variant="dark" />
                </div>
            </nav>

            {/* Rest of the page - dangerouslySetInnerHTML for complex animations */}
            <div
                suppressHydrationWarning={true}
                dangerouslySetInnerHTML={{
                    __html: `
    <!-- Background Grid -->
    <div class="fixed inset-0 bg-grid-pattern z-[-1] pointer-events-none"></div>

    <main class="pt-32 pb-20">
        <!-- Hero Section -->
        <section class="max-w-6xl mx-auto px-6 min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12">
            
            <!-- Hero Text -->
            <div class="w-full md:w-1/2 space-y-8 relative z-10">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-medium">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Now available for University students
                </div>

                <div class="relative">
                    <h1 class="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
                        Turn your <br>
                        <span class="text-zinc-500">Lecture Notes</span> <br>
                        into <span id="typewriter"></span><span class="cursor-blink text-zinc-400">|</span>
                    </h1>
                    
                    <!-- Handwritten Note -->
                    <div class="absolute -right-4 top-0 hidden md:block transform rotate-12">
                        <div class="font-hand text-zinc-400 text-xl flex flex-col items-center">
                            <span class="text-green-500">$$$</span>
                            <svg class="w-16 h-16 text-zinc-500 mt-16 transform scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <p class="text-lg text-zinc-400 max-w-md">
                    The <span class="text-white font-medium">AI-powered</span> marketplace where your <span class="text-white font-medium">neat handwriting</span> pays for your coffee.
                </p>

                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="/login" class="group px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Start Selling Notes
                        <span class="iconify group-hover:translate-x-1 transition-transform" data-icon="lucide:arrow-right" data-width="18"></span>
                    </a>
                    <button class="px-6 py-3 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                        <span class="iconify" data-icon="lucide:play-circle" data-width="18"></span>
                        Watch Demo
                    </button>
                </div>

                <!-- Stats -->
                <div class="flex items-center gap-8 pt-4">
                    <div>
                        <div class="text-2xl font-semibold text-white">$2.4M</div>
                        <div class="text-sm text-zinc-500">Paid to students</div>
                    </div>
                    <div class="w-px h-10 bg-zinc-800"></div>
                    <div>
                        <div class="text-2xl font-semibold text-white">50K+</div>
                        <div class="text-sm text-zinc-500">Notes sold</div>
                    </div>
                    <div class="w-px h-10 bg-zinc-800"></div>
                    <div>
                        <div class="text-2xl font-semibold text-white">4.9</div>
                        <div class="text-sm text-zinc-500 flex items-center gap-1">
                            <span class="iconify text-yellow-500" data-icon="lucide:star" data-width="14"></span>
                            Rating
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hero Visual - 3D Card Stack -->
            <div class="w-full md:w-1/2 relative h-[500px] hidden md:block">
                
                <!-- Floating UI Elements -->
                <div class="absolute top-0 right-0 w-48 p-4 bg-zinc-900/80 backdrop-blur border border-white/10 rounded-xl shadow-xl z-30 float-animation" style="animation-delay: 0s;">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                            <span class="iconify text-green-500" data-icon="lucide:trending-up" data-width="20"></span>
                        </div>
                        <div>
                            <div class="text-xs text-zinc-400">This week</div>
                            <div class="text-lg font-semibold text-white">+$347.50</div>
                        </div>
                    </div>
                    <div class="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div class="h-full w-3/4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
                    </div>
                </div>

                <!-- Main Note Card with 3D effect -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 card-3d">
                    <div class="w-72 h-96 bg-[#fffef0] rounded-lg shadow-2xl p-6 transform rotate-2 relative border-4 border-white">
                        <!-- Scanning laser effect -->
                        <div class="scanning-laser absolute inset-0 z-20 pointer-events-none rounded-lg overflow-hidden opacity-50"></div>
                        
                        <div class="font-hand text-zinc-800">
                            <div class="text-2xl border-b border-zinc-200 pb-2 mb-4">Econ 101 - Ch.5</div>
                            <div class="space-y-2 text-lg text-zinc-600">
                                <p>• Supply & Demand curves</p>
                                <p>• Market equilibrium</p>
                                <p class="flex items-center gap-2">
                                    <span class="text-red-500">★</span> Price elasticity!
                                </p>
                            </div>
                            
                            <div class="mt-6 border-2 border-dashed border-zinc-200 rounded-lg h-24 flex items-center justify-center">
                                <span class="iconify text-zinc-300" data-icon="lucide:image" data-width="32"></span>
                            </div>
                        </div>

                        <!-- Verified Badge -->
                        <div class="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg sticker-pop">
                            <span class="iconify" data-icon="lucide:check" data-width="12"></span>
                            VERIFIED
                        </div>

                        <!-- Price Tag -->
                        <div class="absolute -bottom-4 -left-4 bg-zinc-900 text-white px-4 py-2 rounded-lg shadow-xl font-semibold flex items-center gap-2 sticker-pop" style="animation-delay: 0.2s;">
                            <span class="text-green-400">$</span>
                            <span class="text-xl">12.99</span>
                        </div>
                    </div>
                </div>

                <!-- Background cards for depth -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-[55%] w-72 h-96 bg-zinc-800 rounded-lg shadow-xl opacity-40 -rotate-6"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-[55%] -translate-y-[45%] w-72 h-96 bg-zinc-700 rounded-lg shadow-xl opacity-20 rotate-6"></div>

                <!-- AI Processing indicator -->
                <div class="absolute bottom-10 left-0 p-4 bg-zinc-900/80 backdrop-blur border border-white/10 rounded-xl shadow-xl z-30 float-animation" style="animation-delay: 1.5s;">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center animate-pulse">
                            <span class="iconify text-blue-500" data-icon="lucide:brain" data-width="16"></span>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-white">AI Analyzing...</div>
                            <div class="text-xs text-zinc-400">Quality score: 94%</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section class="max-w-6xl mx-auto px-6 py-32">
            <div class="text-center mb-16">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-medium mb-4">
                    <span class="iconify" data-icon="lucide:zap" data-width="12"></span>
                    Simple Process
                </div>
                <h2 class="text-4xl md:text-5xl font-semibold tracking-tight">
                    From notes to <span class="text-zinc-500">notes</span> <span class="font-hand text-green-500 text-3xl">(cash)</span>
                </h2>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Step 1 -->
                <div class="group p-8 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-white/10">
                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <span class="iconify text-blue-500" data-icon="lucide:upload-cloud" data-width="24"></span>
                    </div>
                    <div class="text-sm text-zinc-500 mb-2 font-medium">01</div>
                    <h3 class="text-xl font-semibold mb-3">Upload Your Notes</h3>
                    <p class="text-zinc-400 text-sm leading-relaxed">
                        Snap a photo or upload your handwritten lecture notes. Our AI handles the rest.
                    </p>
                </div>

                <!-- Step 2 -->
                <div class="group p-8 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-white/10">
                    <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <span class="iconify text-purple-500" data-icon="lucide:scan-line" data-width="24"></span>
                    </div>
                    <div class="text-sm text-zinc-500 mb-2 font-medium">02</div>
                    <h3 class="text-xl font-semibold mb-3">AI Quality Check</h3>
                    <p class="text-zinc-400 text-sm leading-relaxed">
                        Our AI verifies readability, accuracy, and assigns a quality score for fair pricing.
                    </p>
                </div>

                <!-- Step 3 -->
                <div class="group p-8 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-white/10">
                    <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <span class="iconify text-green-500" data-icon="lucide:wallet" data-width="24"></span>
                    </div>
                    <div class="text-sm text-zinc-500 mb-2 font-medium">03</div>
                    <h3 class="text-xl font-semibold mb-3">Get Paid Instantly</h3>
                    <p class="text-zinc-400 text-sm leading-relaxed">
                        Money hits your wallet the moment someone buys. No waiting, no hassle.
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="max-w-6xl mx-auto px-6 py-20">
            <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 md:p-16">
                <!-- Background glow -->
                <div class="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
                <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                
                <div class="relative z-10 text-center max-w-2xl mx-auto">
                    <h2 class="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                        Ready to monetize your <span class="text-zinc-500">knowledge?</span>
                    </h2>
                    <p class="text-lg text-zinc-400 mb-8">
                        Join thousands of students already earning from their lecture notes. It takes less than 2 minutes to start.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/login" class="group px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            Create Student Account
                            <span class="iconify group-hover:translate-x-1 transition-transform" data-icon="lucide:arrow-right" data-width="18"></span>
                        </a>
                        <button class="px-8 py-4 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all">
                            I'm an Educator
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-12">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-2">
                    <span class="iconify text-zinc-400" data-icon="lucide:brain-circuit" data-width="20"></span>
                    <span class="text-sm text-zinc-500">© 2025 Mind Mine. All rights reserved.</span>
                </div>
                <div class="flex items-center gap-6 text-sm text-zinc-500">
                    <a href="#" class="hover:text-white transition-colors">Privacy</a>
                    <a href="#" class="hover:text-white transition-colors">Terms</a>
                    <a href="#" class="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Typewriter effect
        const words = ['Cash', 'Income', 'Freedom', 'Coffee Money'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typewriter = document.getElementById('typewriter');
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriter.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }
        
        type();
    </script>
        `
                }}
            />
        </>
    );
}
