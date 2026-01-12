"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function LoginPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Define the toggleMode function on window for the onclick handlers
        (window as any).toggleMode = function () {
            const body = document.body;
            const isStudent = body.classList.contains('is-student-mode');

            body.classList.toggle('is-student-mode');

            const eduForm = document.getElementById('educator-form');
            const stuForm = document.getElementById('student-form');
            const eduVis = document.getElementById('educator-visual');
            const stuVis = document.getElementById('student-visual');
            const eduBg = document.getElementById('edu-bg');
            const stuBg = document.getElementById('stu-bg');

            if (!isStudent) {
                eduForm?.classList.remove('active');
                eduVis?.classList.remove('active');
                if (eduBg) eduBg.style.opacity = '0';
                stuForm?.classList.add('active');
                stuVis?.classList.add('active');
                if (stuBg) stuBg.style.opacity = '1';
            } else {
                stuForm?.classList.remove('active');
                stuVis?.classList.remove('active');
                if (stuBg) stuBg.style.opacity = '0';
                eduForm?.classList.add('active');
                eduVis?.classList.add('active');
                if (eduBg) eduBg.style.opacity = '1';
            }
        };

        // Mock Login Handler
        (window as any).handleLogin = function (buttonElement: HTMLButtonElement) {
            const form = buttonElement.closest('form');
            if (!form) return;

            const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
            const passwordInput = form.querySelector('input[type="password"]') as HTMLInputElement;

            const email = emailInput?.value;
            const password = passwordInput?.value;

            if (email === "admin" && password === "admin") {
                const isStudent = document.body.classList.contains('is-student-mode');
                window.location.href = isStudent ? "/student/browse" : "/educator/dashboard";
            } else {
                let errorEl = form.querySelector('.login-error') as HTMLParagraphElement;
                if (!errorEl) {
                    errorEl = document.createElement('p');
                    errorEl.className = 'login-error text-red-500 text-xs mt-2 ml-1';
                    const submitButton = form.querySelector('button[type="button"]');
                    if (submitButton) {
                        form.insertBefore(errorEl, submitButton);
                    }
                }
                errorEl.textContent = "Invalid credentials. Try admin/admin";
            }
        };

        return () => {
            document.body.classList.remove('is-student-mode');
            delete (window as any).toggleMode;
            delete (window as any).handleLogin;
        };
    }, []);

    return (
        <>
            <style jsx global>{`
        :root {
            --bg-color: #09090b;
            --text-color: #fafafa;
        }
        
        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Inter', sans-serif;
            overflow: hidden;
        }

        .font-hand {
            font-family: 'Patrick Hand', cursive;
        }

        .bg-grid-pattern {
            background-size: 40px 40px;
            background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        .mode-container {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
        }

        .form-slider {
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            z-index: 20;
            transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
            background: #09090b; 
            border-right: 1px solid rgba(255,255,255,0.05);
        }

        .visual-slider {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            z-index: 10;
            transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .content-layer {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease-in-out;
            padding: 3rem;
        }

        .content-layer.active {
            opacity: 1;
            pointer-events: all;
            transition-delay: 0.3s;
        }

        body.is-student-mode .form-slider {
            transform: translateX(100%);
            border-right: none;
            border-left: 1px solid rgba(255,255,255,0.05);
        }

        body.is-student-mode .visual-slider {
            transform: translateX(-100%);
        }

        @media (max-width: 768px) {
            .form-slider { width: 100%; }
            .visual-slider { display: none; }
            body.is-student-mode .form-slider { transform: none; }
        }

        .input-group input {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            transition: all 0.2s;
        }
        .input-group input:focus {
            outline: none;
            border-color: rgba(255,255,255,0.4);
            box-shadow: 0 0 0 4px rgba(255,255,255,0.05);
        }

        .float-fast { animation: float 4s ease-in-out infinite; }
        .float-slow { animation: float 7s ease-in-out infinite; }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }

        .edu-glow {
            box-shadow: 0 0 100px rgba(59, 130, 246, 0.15);
        }
        .student-glow {
            box-shadow: 0 0 100px rgba(34, 197, 94, 0.15);
        }
      `}</style>

            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
            <Script src="https://code.iconify.design/3/3.1.0/iconify.min.js" strategy="afterInteractive" />

            <div
                ref={containerRef}
                className="antialiased selection:bg-zinc-800 selection:text-white"
                suppressHydrationWarning={true}
                dangerouslySetInnerHTML={{
                    __html: `
    <div class="mode-container bg-grid-pattern">
        
        <!-- Navigation (Absolute) -->
        <div class="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
            <div class="flex items-center gap-2 pointer-events-auto">
                <a href="/" class="flex items-center gap-2 group">
                    <span class="iconify text-zinc-100 transition-transform group-hover:-rotate-12" data-icon="lucide:brain-circuit" data-width="24"></span>
                    <span class="text-lg font-semibold tracking-tighter text-white">MIND MINE</span>
                </a>
            </div>
            <a href="/" class="text-sm text-zinc-500 hover:text-white transition-colors pointer-events-auto flex items-center gap-2">
                <span class="iconify" data-icon="lucide:arrow-left" data-width="16"></span>
                Back to Home
            </a>
        </div>

        <!-- LEFT PANEL (Logic: Initially FORM, becomes VISUAL in student mode) -->
        <div class="form-slider flex items-center justify-center relative">
            
            <!-- EDUCATOR FORM (Visible initially) -->
            <div id="educator-form" class="content-layer active w-full max-w-md mx-auto">
                <div class="w-full">
                    <div class="mb-8">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
                            <span class="iconify" data-icon="lucide:graduation-cap" data-width="14"></span>
                            Educator Portal
                        </div>
                        <h2 class="text-3xl font-semibold tracking-tight">Welcome back, Professor.</h2>
                        <p class="text-zinc-500 mt-2 text-sm">Verify your credentials to manage course assets.</p>
                    </div>

                    <form class="space-y-4">
                        <div class="input-group space-y-1">
                            <label class="text-xs font-medium text-zinc-400 ml-1">Academic Email</label>
                            <input type="email" placeholder="prof@university.edu" class="w-full px-4 py-3 rounded-xl text-sm placeholder:text-zinc-700">
                        </div>
                        <div class="input-group space-y-1">
                            <label class="text-xs font-medium text-zinc-400 ml-1">Password</label>
                            <input type="password" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl text-sm placeholder:text-zinc-700">
                        </div>
                        <div class="flex justify-between items-center text-xs">
                            <label class="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-white">
                                <input type="checkbox" class="rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-0">
                                Remember device
                            </label>
                            <a href="#" class="text-zinc-500 hover:text-white">Forgot password?</a>
                        </div>
                        <button type="button" onclick="handleLogin(this)" class="w-full py-3 bg-white text-black font-semibold rounded-xl text-sm hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Access Dashboard
                        </button>
                    </form>

                    <div class="mt-8 pt-8 border-t border-white/5 text-center">
                        <p class="text-zinc-500 text-sm mb-4">Are you a student looking to sell notes?</p>
                        <button onclick="toggleMode()" class="group px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 text-xs transition-all flex items-center justify-center gap-2 mx-auto w-full md:w-auto">
                            Switch to Student Login
                            <span class="iconify group-hover:translate-x-1 transition-transform" data-icon="lucide:arrow-right" data-width="14"></span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- STUDENT FORM (Hidden initially) -->
            <div id="student-form" class="content-layer w-full max-w-md mx-auto">
                <div class="w-full">
                    <div class="mb-8">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-4">
                            <span class="iconify" data-icon="lucide:coins" data-width="14"></span>
                            Student Miner
                        </div>
                        <h2 class="text-3xl font-semibold tracking-tight">Start Mining Today.</h2>
                        <p class="text-zinc-500 mt-2 text-sm">Turn your tablet scribbles into liquid currency.</p>
                    </div>

                    <form class="space-y-4">
                        <div class="flex gap-4">
                            <button type="button" class="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex justify-center items-center gap-2 text-sm font-medium">
                                <span class="iconify" data-icon="lucide:apple" data-width="16"></span>
                                Apple
                            </button>
                            <button type="button" class="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex justify-center items-center gap-2 text-sm font-medium">
                                <span class="iconify" data-icon="lucide:mail" data-width="16"></span>
                                Google
                            </button>
                        </div>
                        
                        <div class="relative py-2">
                            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
                            <div class="relative flex justify-center text-xs uppercase"><span class="bg-[#09090b] px-2 text-zinc-500">Or continue with email</span></div>
                        </div>

                        <div class="input-group space-y-1">
                            <label class="text-xs font-medium text-zinc-400 ml-1">University Email</label>
                            <input type="email" placeholder="student@edu.com" class="w-full px-4 py-3 rounded-xl text-sm placeholder:text-zinc-700">
                        </div>
                        <div class="input-group space-y-1">
                            <label class="text-xs font-medium text-zinc-400 ml-1">Password</label>
                            <input type="password" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl text-sm placeholder:text-zinc-700">
                        </div>
                        <button type="button" onclick="handleLogin(this)" class="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            Login to Wallet
                        </button>
                    </form>

                    <div class="mt-8 pt-8 border-t border-white/5 text-center">
                        <p class="text-zinc-500 text-sm mb-4">Are you a Professor?</p>
                        <button onclick="toggleMode()" class="group px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 text-xs transition-all flex items-center justify-center gap-2 mx-auto w-full md:w-auto">
                            <span class="iconify group-hover:-translate-x-1 transition-transform rotate-180" data-icon="lucide:arrow-right" data-width="14"></span>
                            Switch to Educator Login
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <!-- RIGHT PANEL (Logic: Initially VISUAL, becomes FORM logic visually via sliding) -->
        <div class="visual-slider relative overflow-hidden flex items-center justify-center">
            
            <!-- BACKGROUND BLUR ELEMENTS -->
            <div id="edu-bg" class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-zinc-900 z-0 transition-opacity duration-700 opacity-100"></div>
            <div id="stu-bg" class="absolute inset-0 bg-gradient-to-bl from-green-900/20 to-zinc-900 z-0 transition-opacity duration-700 opacity-0"></div>

            <!-- EDUCATOR VISUAL (Visible initially) -->
            <div id="educator-visual" class="content-layer active w-full h-full">
                <div class="relative w-full max-w-md aspect-square flex items-center justify-center">
                    <!-- Abstract Dashboard Elements -->
                    <div class="absolute w-64 h-80 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl edu-glow transform -rotate-6 z-10 p-6 flex flex-col justify-between float-slow">
                        <div class="flex gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500/20"></div>
                        </div>
                        <div class="space-y-3">
                            <div class="h-2 w-3/4 bg-zinc-800 rounded"></div>
                            <div class="h-2 w-1/2 bg-zinc-800 rounded"></div>
                            <div class="h-32 w-full bg-blue-500/5 border border-blue-500/10 rounded-lg flex items-center justify-center">
                                <span class="iconify text-blue-500/50" data-icon="lucide:bar-chart-2" data-width="48"></span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center text-xs text-zinc-500">
                            <span>Class Performance</span>
                            <span class="text-blue-400">98%</span>
                        </div>
                    </div>

                    <!-- Floating Card -->
                    <div class="absolute -right-4 top-20 w-48 p-4 bg-zinc-900/90 backdrop-blur border border-white/10 rounded-lg shadow-xl z-20 float-fast" style="animation-delay: 1s;">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-500/10 rounded-md text-blue-400">
                                <span class="iconify" data-icon="lucide:check-circle-2" data-width="18"></span>
                            </div>
                            <div>
                                <div class="text-xs text-zinc-400">Notes Verified</div>
                                <div class="text-sm font-semibold">1,240 Docs</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- STUDENT VISUAL (Hidden initially) -->
            <div id="student-visual" class="content-layer w-full h-full">
                <div class="relative w-full max-w-md aspect-square flex items-center justify-center">
                    
                    <!-- Messy Notes Stack -->
                    <div class="absolute w-64 h-80 bg-[#ffffea] text-black border-4 border-white rounded-sm shadow-2xl student-glow transform rotate-3 z-10 p-6 float-slow">
                        <div class="font-hand text-2xl text-zinc-800 mb-4 border-b border-zinc-200 pb-2">Micro-Econ 201</div>
                        <div class="font-hand text-lg text-zinc-600 space-y-2">
                            <p>Supply > Demand = <span class="text-red-500">Price Drop!</span></p>
                            <div class="border-2 border-dashed border-zinc-300 h-24 rounded flex items-center justify-center">
                                <span class="iconify text-zinc-400" data-icon="lucide:trending-up" data-width="32"></span>
                            </div>
                            <p class="text-sm">* remember the graph for the exam!!</p>
                        </div>
                        
                        <!-- Sold Sticker -->
                        <div class="absolute -bottom-4 -right-4 bg-green-500 text-white font-bold px-4 py-2 rounded-full shadow-lg transform -rotate-12 border-2 border-white">
                            SOLD $15
                        </div>
                    </div>

                    <!-- Coin Elements -->
                    <div class="absolute top-10 right-10 bg-zinc-900 border border-white/10 p-3 rounded-full shadow-xl z-20 float-fast" style="animation-delay: 0.5s;">
                         <span class="iconify text-yellow-400" data-icon="lucide:bitcoin" data-width="32"></span>
                    </div>

                    <div class="absolute bottom-20 left-0 bg-zinc-900 border border-white/10 px-4 py-2 rounded-lg shadow-xl z-20 float-fast flex items-center gap-2" style="animation-delay: 1.5s;">
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span class="text-xs font-mono text-green-400">+$24.50 Recieved</span>
                   </div>
                </div>
            </div>

        </div>

    </div>
          `
                }}
            />
        </>
    );
}
