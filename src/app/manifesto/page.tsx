"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ManifestoPage() {
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
                        <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                        <Link href="/manifesto" className="text-white font-semibold border-b-2 border-primary pb-1">Manifesto</Link>
                    </nav>
                    <div className="flex gap-4 items-center">
                        <Link href="/login" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Log In</Link>
                        <Link href="/dashboard" className="px-5 py-2.5 texture-paper text-black text-sm font-semibold rounded-full hover:bg-white transition-all shadow-[0_0_20px_-5px_rgba(245,245,220,0.5)]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="prose prose-invert prose-lg md:prose-xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-12 text-center leading-tight">
                        Software has become <br /> <span className="text-gradient-gold">too noisy.</span>
                    </h1>

                    <div className="space-y-8 text-zinc-300 font-light leading-relaxed text-xl">
                        <p>
                            Every day, we are bombarded with notifications, endless data streams, and feature-bloated dashboards.
                            We spend more time managing our tools than actually doing the work.
                        </p>

                        <p>
                            CRMs are the worst offenders. They have become digital dumping grounds—cemeteries for contact data where relationships go to die.
                            Salespeople hate them. Managers tolerate them. Nobody loves them.
                        </p>

                        <hr className="border-white/10 my-12" />

                        <h2 className="text-3xl font-bold text-white mb-6">Our Philosophy</h2>

                        <ul className="list-none space-y-6 pl-0">
                            <li className="flex gap-4">
                                <span className="text-primary font-bold text-2xl">01.</span>
                                <div>
                                    <strong className="text-white block mb-1">Clarity over Quantity.</strong>
                                    We don't show you everything. We show you what matters effectively immediately.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-primary font-bold text-2xl">02.</span>
                                <div>
                                    <strong className="text-white block mb-1">Action over Storage.</strong>
                                    A CRM should tell you what to do next, not just what happened last month.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-primary font-bold text-2xl">03.</span>
                                <div>
                                    <strong className="text-white block mb-1">Beauty is Function.</strong>
                                    If software isn't enjoyable to use, it won't be used. Design isn't just decoration; it's how you feel while working.
                                </div>
                            </li>
                        </ul>

                        <hr className="border-white/10 my-12" />

                        <p>
                            We built NitiCRMs to be the <strong>decision layer</strong> for your business.
                            We stripped away the complexity and replaced it with intelligence.
                        </p>

                        <p>
                            It's not for everyone. It's for teams who value focus, speed, and precision.
                        </p>

                        <div className="mt-12 text-center">
                            <p className="font-serif italic text-2xl text-primary mb-8">"Simplicity is the ultimate sophistication."</p>
                            <Image src="/logo_full.jpg" alt="Signature" width={100} height={30} className="object-contain invert mix-blend-screen opacity-50 mx-auto" />
                        </div>
                    </div>
                </motion.div>
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
