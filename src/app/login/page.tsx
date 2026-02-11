"use client";

import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 font-sans selection:bg-primary selection:text-black relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
            </div>

            <div className="w-full max-w-md bg-card border border-border p-8 relative z-10 rounded-2xl shadow-2xl texture-matte">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <Image src="/logo_full.jpg" alt="NitiCRMs" width={220} height={60} className="object-contain rounded-lg" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to your NitiCRMs account</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors w-5 h-5" />
                            <input
                                type="email"
                                placeholder="you@company.com"
                                className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors w-5 h-5" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                            <input type="checkbox" className="rounded bg-muted border-border text-primary focus:ring-primary" />
                            Remember me
                        </label>
                        <Link href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">Forgot password?</Link>
                    </div>

                    <Link href="/dashboard" className="flex items-center justify-center w-full py-3 bg-primary text-primary-foreground text-lg font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group texture-paper">
                        Sign In <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </form>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account? <Link href="#" className="text-foreground hover:text-primary font-medium ml-1 transition-colors">Create one</Link>
                </div>
            </div>

            <div className="absolute bottom-6 text-muted-foreground text-xs font-mono">
                © 2026 NitiCRMs Inc.
            </div>
        </div>
    );
}
