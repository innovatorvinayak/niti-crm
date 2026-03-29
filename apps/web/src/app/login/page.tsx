"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiRequest, isApiError } from "@/lib/api";
import { saveAuthSession, type StoredOrganization } from "@/lib/auth-storage";

type LoginResponse = {
    access_token: string;
    token_type: string;
    organization: StoredOrganization | null;
};

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "", organization_slug: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [requiresOrgSlug, setRequiresOrgSlug] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiRequest<LoginResponse>("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    organization_slug: formData.organization_slug.trim() || undefined,
                }),
            });

            saveAuthSession(data.access_token, data.organization);
            router.push("/dashboard");
        } catch (err) {
            if (isApiError(err) && err.status === 409 && err.detail.includes("organization_slug")) {
                setRequiresOrgSlug(true);
                setError("This email belongs to multiple organizations. Enter your organization slug to continue.");
                return;
            }

            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-sans relative overflow-hidden">
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-black p-12 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-400/8 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-500/5 to-transparent rounded-full" />
                </div>
                
                <div className="relative z-10 text-center max-w-md">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full" />
                        <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={280} height={80} className="object-contain rounded-2xl relative z-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Welcome to NitiCRMs</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">The intelligent CRM that helps you close deals faster with AI-powered insights and automation.</p>
                    
                    <div className="mt-12 flex justify-center gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-500">10x</div>
                            <div className="text-zinc-500 text-sm">Faster</div>
                        </div>
                        <div className="w-px bg-zinc-700" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-500">50%</div>
                            <div className="text-zinc-500 text-sm">More Leads</div>
                        </div>
                        <div className="w-px bg-zinc-700" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-500">24/7</div>
                            <div className="text-zinc-500 text-sm">AI Support</div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                    {[1,2,3].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-yellow-500' : 'bg-zinc-700'} transition-all`} />
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-6 relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
                </div>

                <div className="w-full max-w-sm relative z-10">
                    <div className="lg:hidden text-center mb-8">
                        <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={180} height={50} className="object-contain mx-auto rounded-lg" />
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
                        <p className="text-muted-foreground text-sm">Enter your credentials to access your workspace</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {requiresOrgSlug && (
                            <div className="space-y-2">
                                <label htmlFor="organizationSlug" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Organization Slug</label>
                                <input
                                    id="organizationSlug"
                                    type="text"
                                    placeholder="your-company-slug"
                                    value={formData.organization_slug}
                                    onChange={(event) => setFormData({ ...formData, organization_slug: event.target.value })}
                                    className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                                    required
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-12 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                                <input type="checkbox" className="rounded bg-secondary border-border text-primary focus:ring-primary/50" />
                                Remember me
                            </label>
                            <Link href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">Forgot password?</Link>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            Create one
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
