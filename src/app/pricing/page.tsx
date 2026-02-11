"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Wallet, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
    const tiers = [
        {
            name: "Starter",
            price: "$0",
            description: "For individuals and small teams just getting started.",
            features: [
                "Up to 3 users",
                "Manage 50 deals",
                "Basic Kanban board",
                "Email support"
            ],
            cta: "Start Free",
            highlight: false
        },
        {
            name: "Professional",
            price: "$29",
            period: "/user/mo",
            description: "For growing teams that need more power and flexibility.",
            features: [
                "Unlimited users",
                "Unlimited deals",
                "Advanced workflows",
                "AI Action Center",
                "Priority support",
                "Custom fields"
            ],
            cta: "Get Started",
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For large organizations with complex needs.",
            features: [
                "Dedicated account manager",
                "SLA guarantees",
                "SSO & advanced security",
                "Custom integrations",
                "On-premise deployment"
            ],
            cta: "Contact Sales",
            highlight: false
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-primary selection:text-black texture-matte">
            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo_full.jpg" alt="NitiCRMs" width={140} height={40} className="object-contain rounded-lg invert mix-blend-screen" />
                    </Link>
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
                        <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
                        <Link href="/pricing" className="text-white font-semibold">Pricing</Link>
                        <Link href="/manifesto" className="hover:text-primary transition-colors">Manifesto</Link>
                    </nav>
                    <div className="flex gap-4 items-center">
                        <Link href="/login" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Log In</Link>
                        <Link href="/dashboard" className="px-5 py-2.5 texture-paper text-black text-sm font-semibold rounded-full hover:bg-white transition-all shadow-[0_0_20px_-5px_rgba(245,245,220,0.5)]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold">
                        Honest pricing. <br /> <span className="text-gradient-gold">No hidden fees.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Choose the plan that fits your stage of growth. Cancel anytime.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl border transition-all duration-300 ${tier.highlight
                                    ? "bg-gradient-to-br from-zinc-900 to-black border-primary/50 shadow-[0_0_40px_-10px_rgba(245,245,220,0.15)] scale-105 z-10"
                                    : "bg-[#0a0a0a] border-white/10 hover:border-white/20"
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                                {tier.period && <span className="text-zinc-500 text-sm">{tier.period}</span>}
                            </div>
                            <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">{tier.description}</p>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                        <Check size={16} className={tier.highlight ? "text-primary" : "text-zinc-500"} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/dashboard"
                                className={`w-full py-4 rounded-xl flex items-center justify-center font-bold transition-all ${tier.highlight
                                        ? "bg-primary text-black hover:bg-white shadow-lg shadow-primary/20 texture-paper"
                                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 border-t border-white/5 pt-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div>
                            <h3 className="font-bold text-lg mb-2">Can I switch plans later?</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Absolutely. You can upgrade or downgrade your plan at any time from your account settings.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Is there a free trial?</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Yes, all paid plans come with a 14-day free trial. No credit card required to start.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Do you offer discounts for non-profits?</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Yes, we offer a 50% discount for registered non-profit organizations. Contact us for details.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">We accept all major credit cards (Visa, Mastercard, Amex) and PayPal.</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-white/5 bg-black text-center texture-matte">
                <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
                    <Image src="/logo_full.jpg" alt="NitiCRMs" width={130} height={40} className="object-contain invert mix-blend-screen" />
                </div>
                <p className="text-zinc-600 text-sm">&copy; {new Date().getFullYear()} NitiCRMs Inc. Crafted with precision.</p>
            </footer>
        </div>
    );
}
