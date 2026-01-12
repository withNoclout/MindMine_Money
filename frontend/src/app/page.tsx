"use client";

export default function LandingPage() {
    return (
        <div
            suppressHydrationWarning={true}
            dangerouslySetInnerHTML={{
                __html: `
    <!-- Background Grid -->
    <div class="fixed inset-0 bg-grid-pattern z-[-1] pointer-events-none"></div>

    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#09090b]/80">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="iconify text-zinc-100" data-icon="lucide:brain-circuit" data-width="24"></span>
                <span class="text-lg font-semibold tracking-tighter text-white">MIND MINE</span>
            </div>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <a href="#" class="highlighter-hover transition-colors hover:text-white">Marketplace</a>
                <a href="#" class="highlighter-hover transition-colors hover:text-white">How it works</a>
                <a href="#" class="highlighter-hover transition-colors hover:text-white">Pricing</a>
            </div>
            <button class="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">
                Login
            </button>
        </div>
    </nav>

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
                            <span>literally.</span>
                            <span class="iconify rotate-180" data-icon="lucide:arrow-up-left" data-width="24"></span>
                        </div>
                    </div>
                </div>

                <p class="text-zinc-400 text-lg md:text-xl max-w-md leading-relaxed">
                    The AI-powered marketplace where your neat handwriting pays for your coffee. Upload scans, get graded, get paid.
                </p>

                <div class="flex items-center gap-4 pt-4">
                    <button class="group relative px-8 py-3 bg-white text-black rounded-full font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95">
                        Start Mining
                        <span class="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10"></span>
                    </button>
                    <button class="px-6 py-3 text-zinc-400 text-sm font-medium hover:text-white transition-colors flex items-center gap-2">
                        <span class="iconify" data-icon="lucide:play-circle" data-width="18"></span>
                        See Demo
                    </button>
                </div>
            </div>

            <!-- Hero Visual (3D iPad) -->
            <div class="w-full md:w-1/2 perspective-container flex justify-center relative">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zinc-800 rounded-full blur-[100px] opacity-40"></div>
                
                <div class="ipad-card relative w-[320px] h-[440px] bg-[#121214] rounded-[2rem] border border-white/20 overflow-hidden float-anim">
                    <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-30"></div>
                    
                    <div class="h-6 w-full flex justify-between items-center px-6 mt-4 opacity-50">
                        <span class="text-[10px] text-white">9:41</span>
                        <div class="flex gap-1">
                            <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                            <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                        </div>
                    </div>

                    <div class="p-6 space-y-4">
                        <h3 class="font-hand text-2xl text-zinc-300">Physics 101: Thermodynamics</h3>
                        
                        <div class="space-y-3 opacity-80">
                            <div class="h-1 w-full bg-zinc-700 rounded-full"></div>
                            <div class="h-1 w-3/4 bg-zinc-700 rounded-full"></div>
                            <div class="h-1 w-5/6 bg-zinc-700 rounded-full"></div>
                            <div class="h-1 w-full bg-zinc-700 rounded-full"></div>
                        </div>

                        <div class="mt-6 border border-dashed border-zinc-600 rounded-lg h-32 flex items-center justify-center relative">
                            <span class="iconify text-zinc-600" data-icon="lucide:atom" data-width="48"></span>
                            <div class="absolute -right-2 -bottom-2 transform -rotate-12 bg-[#ffff00] text-black text-[10px] px-2 py-0.5 font-hand font-bold shadow-sm">
                                Important!
                            </div>
                        </div>
                    </div>

                    <div class="scanner-beam"></div>

                    <div class="absolute bottom-6 left-0 right-0 flex justify-center">
                        <div class="bg-zinc-800/80 backdrop-blur px-4 py-2 rounded-full border border-white/10 flex gap-4">
                            <span class="iconify text-zinc-400" data-icon="lucide:pen-tool" data-width="16"></span>
                            <span class="iconify text-zinc-400" data-icon="lucide:eraser" data-width="16"></span>
                            <span class="iconify text-blue-400" data-icon="lucide:check-circle" data-width="16"></span>
                        </div>
                    </div>
                </div>
                
                <div class="absolute top-10 -right-4 bg-[#18181b] border border-white/10 px-4 py-2 rounded-lg shadow-xl float-anim" style="animation-delay: 1s;">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        <span class="text-xs font-medium text-zinc-300">Grade: A+</span>
                    </div>
                    <div class="text-xs text-zinc-500 mt-1">Value: $5.00</div>
                </div>
            </div>
        </section>

        <!-- Timeline Section -->
        <section class="max-w-3xl mx-auto px-6 py-32">
            <div class="text-center mb-16">
                <span class="font-hand text-xl text-zinc-500 block mb-2 -rotate-2">A day in the life</span>
                <h2 class="text-3xl md:text-4xl font-semibold tracking-tight">From Lecture to Lunch</h2>
            </div>

            <div class="relative">
                <div class="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent md:-translate-x-1/2"></div>

                <div class="space-y-16">
                    <div class="relative flex md:justify-end md:items-center group">
                        <div class="absolute left-0 md:left-1/2 w-14 h-14 bg-[#09090b] border border-white/20 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 shadow-[0_0_20px_rgba(0,0,0,1)]">
                            <span class="iconify text-zinc-300" data-icon="lucide:mic" data-width="20"></span>
                        </div>
                        <div class="ml-20 md:ml-0 md:w-5/12 text-left md:text-right p-6 rounded-xl border border-white/5 bg-white/[0.02] transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                            <div class="inline-block px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-500 mb-2 font-mono">08:00 AM</div>
                            <h3 class="text-lg font-semibold text-zinc-200">Record the lecture</h3>
                            <p class="text-sm text-zinc-500 mt-1">Just hit record. Focus on listening, not frantically scribbling.</p>
                        </div>
                    </div>

                    <div class="relative flex md:justify-start md:items-center group">
                        <div class="absolute left-0 md:left-1/2 w-14 h-14 bg-[#09090b] border border-white/20 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 shadow-[0_0_20px_rgba(0,0,0,1)]">
                            <span class="iconify text-zinc-300" data-icon="lucide:tablet" data-width="20"></span>
                        </div>
                        <div class="ml-20 md:ml-0 md:w-5/12 md:mr-auto p-6 rounded-xl border border-white/5 bg-white/[0.02] transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                            <div class="inline-block px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-500 mb-2 font-mono">12:00 PM</div>
                            <h3 class="text-lg font-semibold text-zinc-200">Upload while eating</h3>
                            <p class="text-sm text-zinc-500 mt-1">Export from GoodNotes or take a photo. AI scans it instantly.</p>
                        </div>
                    </div>

                    <div class="relative flex md:justify-end md:items-center group">
                        <div class="absolute left-0 md:left-1/2 w-14 h-14 bg-[#09090b] border border-yellow-500/30 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                            <span class="iconify text-yellow-400" data-icon="lucide:sparkles" data-width="20"></span>
                        </div>
                        <div class="ml-20 md:ml-0 md:w-5/12 text-left md:text-right p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.02] transition-colors">
                            <div class="inline-block px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-500 mb-2 font-mono">12:05 PM</div>
                            <h3 class="text-lg font-semibold text-yellow-101">AI Grades & Mints</h3>
                            <p class="text-sm text-zinc-400 mt-1">Quality check complete. Your notes are now a purchasable asset.</p>
                        </div>
                    </div>

                    <div class="relative flex md:justify-start md:items-center group">
                        <div class="absolute left-0 md:left-1/2 w-14 h-14 bg-[#09090b] border border-green-500/30 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            <span class="iconify text-green-400" data-icon="lucide:wallet" data-width="20"></span>
                        </div>
                        <div class="ml-20 md:ml-0 md:w-5/12 md:mr-auto p-6 rounded-xl border border-green-500/20 bg-green-500/[0.02] relative overflow-hidden">
                            <div class="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-green-500/10 blur-xl rounded-full"></div>
                            <div class="inline-block px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-500 mb-2 font-mono">04:00 PM</div>
                            <h3 class="text-lg font-semibold text-green-100">Payout Received</h3>
                            <p class="text-sm text-zinc-400 mt-1">Someone bought your Thermo notes. $12.50 added to balance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tools Gallery -->
        <section class="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
            <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
                <div>
                    <h2 class="text-3xl font-semibold tracking-tight">Works with your mess.</h2>
                    <p class="text-zinc-500 mt-2">We support all the tools you already use.</p>
                </div>
                <div class="font-hand text-zinc-400 -rotate-3 text-lg">
                    drag them around! ->
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 h-64 p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#3f3f46 1px, transparent 1px); background-size: 16px 16px;"></div>

                <div class="sticker flex flex-col items-center justify-center p-6 rounded-lg w-full aspect-square cursor-grab active:cursor-grabbing" style="--rotation: -3deg;">
                    <span class="iconify text-blue-600 mb-2" data-icon="lucide:pen-line" data-width="32"></span>
                    <span class="font-bold text-sm tracking-tight text-center">GoodNotes</span>
                </div>

                <div class="sticker flex flex-col items-center justify-center p-6 rounded-lg w-full aspect-square cursor-grab active:cursor-grabbing" style="--rotation: 2deg;">
                    <span class="iconify text-purple-600 mb-2" data-icon="lucide:mic-2" data-width="32"></span>
                    <span class="font-bold text-sm tracking-tight text-center">Notability</span>
                </div>

                <div class="sticker flex flex-col items-center justify-center p-6 rounded-lg w-full aspect-square cursor-grab active:cursor-grabbing" style="--rotation: -1deg;">
                    <span class="iconify text-red-500 mb-2" data-icon="lucide:file-type-pdf" data-width="32"></span>
                    <span class="font-bold text-sm tracking-tight text-center">Raw PDF</span>
                </div>

                <div class="sticker flex flex-col items-center justify-center p-6 rounded-lg w-full aspect-square cursor-grab active:cursor-grabbing" style="--rotation: 4deg;">
                    <span class="iconify text-orange-500 mb-2" data-icon="lucide:video" data-width="32"></span>
                    <span class="font-bold text-sm tracking-tight text-center">MP4 Rec</span>
                </div>
            </div>
        </section>

        <!-- CTA Footer -->
        <section class="max-w-4xl mx-auto px-6 py-20 text-center">
            <h2 class="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
                Your brain is a goldmine.<br>
                <span class="text-zinc-600">Start digging.</span>
            </h2>
            <div class="flex justify-center">
                <button class="px-8 py-3 bg-white text-black rounded-full font-semibold text-sm transition-transform hover:scale-105">
                    Create Student Account
                </button>
            </div>
            <div class="mt-12 flex justify-center gap-8 text-xs text-zinc-600 font-medium tracking-wide uppercase">
                <a href="#" class="hover:text-zinc-400 transition-colors">Privacy</a>
                <a href="#" class="hover:text-zinc-400 transition-colors">Terms</a>
                <a href="#" class="hover:text-zinc-400 transition-colors">Twitter</a>
            </div>
        </section>
    </main>

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
    <script>
        // Typewriter Effect
        const textToType = "Lunch Money.";
        const typeWriterElement = document.getElementById('typewriter');
        let i = 0;

        function typeWriter() {
            if (i < textToType.length) {
                if (typeWriterElement) {
                   typeWriterElement.innerHTML += textToType.charAt(i);
                   i++;
                   setTimeout(typeWriter, 150);
                }
            }
        }
        setTimeout(typeWriter, 1000);

        // Sticker hover
        const stickers = document.querySelectorAll('.sticker');
        stickers.forEach(sticker => {
            sticker.addEventListener('mousemove', (e) => {
                const rect = sticker.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                sticker.style.setProperty('--x', x + 'px');
                sticker.style.setProperty('--y', y + 'px');
            });
        });
    </script>
        `,
            }}
        />
    );
}
