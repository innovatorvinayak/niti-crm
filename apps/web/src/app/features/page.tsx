"use client";

import { motion } from "framer-motion";
import { Zap, LayoutDashboard, ShieldCheck, Cpu, Users, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturesPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        {
            title: "Intelligent Workflows",
            description: "Automate repetitive tasks with simple if-this-then-that logic built specifically for high-velocity sales teams. No code required.",
            icon: Zap,
            color: "text-yellow-400"
        },
        {
            title: "Pipeline Visibility",
            description: "See every deal stage instantly. Drag, drop, and close more deals faster with our fluid Kanban interface that feels like a modern app.",
            icon: LayoutDashboard,
            color: "text-blue-400"
        },
        {
            title: "Bank-Grade Security",
            description: "Your data is encrypted and secure. We take privacy seriously with SOC2 compliant infrastructure and role-based access control.",
            icon: ShieldCheck,
            color: "text-green-400"
        },
        {
            title: "AI Action Center",
            description: "Don't just store data—act on it. Our AI suggests the next best step for every lead, increasing conversion rates by up to 40%.",
            icon: Cpu,
            color: "text-purple-400"
        },
        {
            title: "Team Collaboration",
            description: "Comment, tag, and collaborate on deals in real-time. Keep everyone in the loop without endless email threads.",
            icon: Users,
            color: "text-orange-400"
        },
        {
            title: "Advanced Analytics",
            description: "Beautiful, dark-mode dashboards that show you exactly what you need to know. Revenue forecasting, team performance, and more.",
            icon: BarChart3,
            color: "text-pink-400"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white texture-matte">
            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={140} height={40} className="object-contain rounded-lg" />
                    </Link>
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
                        <Link href="/features" className="text-foreground font-semibold">Features</Link>
                        <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                        <Link href="/manifesto" className="hover:text-primary transition-colors">Manifesto</Link>
                    </nav>
                    <div className="flex gap-4 items-center">
                        <Link href="/login" className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">Log In</Link>
                        <Link href="/signup" className="px-5 py-2.5 texture-paper bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-primary text-sm font-mono tracking-wider uppercase mb-4 block">Capabilities</span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        A CRM that <span className="text-gradient-gold">thinks</span> like you.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We stripped away the clutter and focused on the tools that actually help you close deals.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group hover:-translate-y-1 relative overflow-hidden shadow-sm"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

                            <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                                <feature.icon size={24} />
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 rounded-3xl bg-gradient-to-br from-muted to-background border border-border text-center relative overflow-hidden shadow-sm"
                >
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Ready to regain focus?</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join thousands of high-performing teams who have switched to NitiCRMs.</p>
                        <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 texture-paper bg-primary text-primary-foreground text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                            Start Your Free Trial <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>
            </main>

            <footer className="py-12 border-t border-border bg-background text-center texture-matte">
                <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
                    <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={130} height={40} className="object-contain" />
                </div>
                <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} NitiCRMs Inc. Crafted with precision.</p>
            </footer>
        </div>
    );
}
