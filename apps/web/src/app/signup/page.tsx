"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Lock, Eye, EyeOff, User, Building, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { saveAuthSession, type StoredOrganization } from "@/lib/auth-storage";

type SignupResponse = {
    access_token: string;
    token_type: string;
    organization: StoredOrganization | null;
};

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", organization_name: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const passwordStrength = () => {
        const { password } = formData;
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strength = passwordStrength();
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-400", "bg-green-500"];
    const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiRequest<SignupResponse>("/auth/signup", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            saveAuthSession(data.access_token, data.organization);
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-sans relative overflow-hidden">
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-black p-12 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-400/8 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-500/5 to-transparent rounded-full" />
                </div>
                
                <div className="relative z-10 text-center max-w-md">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full" />
                        <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={280} height={80} className="object-contain rounded-2xl relative z-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Start your journey</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">Join thousands of teams using NitiCRMs to transform their sales process.</p>
                    
                    <div className="space-y-4 text-left">
                        {[
                            "AI-powered lead scoring",
                            "Automated workflows",
                            "Real-time analytics",
                            "Team collaboration"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-zinc-300">
                                <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-yellow-500" />
                                </div>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-6 relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
                </div>

                <div className="w-full max-w-sm relative z-10">
                    <div className="lg:hidden text-center mb-6">
                        <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={180} height={50} className="object-contain mx-auto rounded-lg" />
                    </div>

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
                        <p className="text-muted-foreground text-sm">Start your 14-day free trial</p>
                    </div>

                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="John"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-secondary border border-border rounded-lg pl-10 pr-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Organization</label>
                                <div className="relative group">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Acme Inc"
                                        value={formData.organization_name}
                                        onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
                                        className="w-full bg-secondary border border-border rounded-lg pl-10 pr-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                                <input
                                    type="email"
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-12 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {formData.password && strength > 0 && (
                                <div className="space-y-1">
                                    <div className="flex gap-1">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < strength ? strengthColors[strength - 1] : 'bg-secondary'}`} />
                                        ))}
                                    </div>
                                    <p className={`text-xs ${strength >= 3 ? 'text-green-500' : strength >= 2 ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {strengthLabels[strength - 1]}
                                    </p>
                                </div>
                            )}
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
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="text-xs text-muted-foreground text-center">
                            By signing up, you agree to our <Link href="#" className="text-primary hover:underline">Terms</Link> and <Link href="#" className="text-primary hover:underline">Privacy</Link>
                        </p>
                    </form>

                    <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> No credit card</span>
                        <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Cancel anytime</span>
                    </div>

                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
