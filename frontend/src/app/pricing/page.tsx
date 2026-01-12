"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function PricingPage() {
    const { user } = useAuth();
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Student",
            price: 9.99,
            description: "Essential tools for casual learners.",
            features: [
                "5 Downloads per month",
                "Ad-free browsing",
                "Standard PDF Viewer",
                "1 Device Access"
            ],
            notIncluded: [
                "Video Walkthroughs",
                "Seller Analytics",
                "0% Commission"
            ],
            popular: false
        },
        {
            name: "Scholar",
            price: 19.99,
            description: "Perfect for serious students aiming for A+.",
            features: [
                "Unlimited Downloads",
                "Ad-free browsing",
                "Immersive PDF Viewer",
                "Access Video Walkthroughs",
                "3 Device Access"
            ],
            notIncluded: [
                "Seller Analytics",
                "0% Commission"
            ],
            popular: true
        },
        {
            name: "Mastermind",
            price: 69.99,
            description: "For power sellers and academic elites.",
            features: [
                "Everything in Scholar",
                "Seller Analytics Pro",
                "0% Commission on Sales",
                "Priority Support",
                "Early Access to Features",
                "Unlimited Devices"
            ],
            notIncluded: [],
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
            <Navbar />

            <main className="relative pt-32 pb-24 px-6">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-900/10 via-black to-black pointer-events-none" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                            Invest in Your Knowledge
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Choose the plan that fits your learning journey. Upgrade anytime.
                        </p>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>
                                Monthly
                            </span>
                            <button
                                onClick={() => setIsAnnual(!isAnnual)}
                                className="w-14 h-8 bg-zinc-800 rounded-full p-1 relative transition-colors hover:bg-zinc-700"
                            >
                                <div
                                    className={`w-6 h-6 bg-green-500 rounded-full shadow-lg transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
                                />
                            </button>
                            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-zinc-500'}`}>
                                Annually <span className="text-green-400 text-xs ml-1">(Save 30%)</span>
                            </span>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => {
                            const price = isAnnual
                                ? (plan.price * 12 * 0.7 / 12).toFixed(2)
                                : plan.price;

                            return (
                                <div
                                    key={plan.name}
                                    className={`
                                        relative p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 group
                                        ${plan.popular
                                            ? 'bg-zinc-900/80 border-green-500/50 shadow-2xl shadow-green-900/20 scale-105 z-20'
                                            : 'bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60 z-10'
                                        }
                                    `}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-green-500 text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-white">${price}</span>
                                            <span className="text-zinc-500">/mo</span>
                                        </div>
                                        {isAnnual && (
                                            <p className="text-xs text-green-400 mt-2">
                                                Billed ${(plan.price * 12 * 0.7).toFixed(2)} yearly
                                            </p>
                                        )}
                                        <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
                                            {plan.description}
                                        </p>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-start gap-3">
                                                <div className="mt-1 w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-2.5 h-2.5 text-green-400" />
                                                </div>
                                                <span className="text-sm text-zinc-300">{feature}</span>
                                            </div>
                                        ))}
                                        {plan.notIncluded.map((feature) => (
                                            <div key={feature} className="flex items-start gap-3 opacity-50">
                                                <div className="mt-1 w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                                    <X className="w-2.5 h-2.5 text-red-400" />
                                                </div>
                                                <span className="text-sm text-zinc-500">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className={`
                                            w-full py-3.5 rounded-xl font-semibold transition-all duration-300
                                            ${plan.popular
                                                ? 'bg-green-500 text-black hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20'
                                                : 'bg-white/5 text-white hover:bg-white/10'
                                            }
                                        `}
                                    >
                                        Choose {plan.name}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-24 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-semibold text-center text-white mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. Your access will continue until the end of the billing period." },
                                { q: "Is there a student discount?", a: "The Student plan is specifically priced for students. We periodically offer additional promo codes for .edu emails." },
                                { q: "How do payouts work for Sellers?", a: "Sellers on the Mastermind plan get instant payouts via Stripe. Other plans receive monthly payouts with a standard processing time." }
                            ].map((item, i) => (
                                <div key={i} className="bg-zinc-900/30 border border-white/5 rounded-xl p-6">
                                    <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
