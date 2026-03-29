"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
    LayoutDashboard,
    RefreshCw,
    Loader2,
    Plus,
    TrendingUp,
    Target,
    UserPlus,
    BadgeCheck,
    Mail,
    Sparkles,
} from "lucide-react";
import AIInsights from "@/components/AIInsights";
import { motion } from "framer-motion";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isApiError } from "@/lib/api";
import { clearAuthSession } from "@/lib/auth-storage";
import { LEAD_STAGES, normalizeLeadStage, type LeadStage } from "@/lib/leads";
import { useLeads } from "@/lib/LeadContext";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

type QuickLeadState = {
    name: string;
    email: string;
    status: LeadStage;
};

function formatShortDate(isoDate: string): string {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function getLastNMonths(count: number): { label: string; key: string }[] {
    const now = new Date();
    return Array.from({ length: count }, (_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (count - index - 1), 1);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return {
            label: date.toLocaleString("en-US", { month: "short" }),
            key: `${date.getFullYear()}-${month}`,
        };
    });
}

function percent(part: number, total: number): string {
    if (total === 0) return "0%";
    return `${Math.round((part / total) * 100)}%`;
}

function getLeadInitials(name: string): string {
    const trimmedName = name.trim();
    if (!trimmedName) return "?";
    const segments = trimmedName.split(/\s+/).filter(Boolean);
    if (segments.length === 1) return segments[0].slice(0, 2).toUpperCase();
    return `${segments[0][0]}${segments[1][0]}`.toUpperCase();
}

function KpiCard({ title, value, subtitle, icon }: { title: string; value: string; subtitle: string; icon: ReactNode }) {
    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-muted-foreground">
                <p className="text-xs uppercase tracking-wider font-semibold">{title}</p>
                {icon}
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
        </div>
    );
}

export default function DashboardPage() {
    const router = useRouter();
    const { leads, loading, refreshing, error, loadLeads, addLead } = useLeads();
    const [isQuickLeadOpen, setIsQuickLeadOpen] = useState(false);
    const [isSavingLead, setIsSavingLead] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [quickLeadState, setQuickLeadState] = useState<QuickLeadState>({
        name: "",
        email: "",
        status: "New",
    });

    const stageCounts = useMemo(() => {
        const totals = { New: 0, Contacted: 0, Qualified: 0, Proposal: 0, Won: 0 } as Record<LeadStage, number>;
        for (const lead of leads) {
            const stage = normalizeLeadStage(lead.status);
            totals[stage] += 1;
        }
        return totals;
    }, [leads]);

    const sixMonthBuckets = useMemo(() => {
        const months = getLastNMonths(6);
        const values = months.map(() => 0);
        for (const lead of leads) {
            const createdDate = new Date(lead.created_at);
            if (Number.isNaN(createdDate.getTime())) continue;
            const key = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, "0")}`;
            const index = months.findIndex((month) => month.key === key);
            if (index >= 0) values[index] += 1;
        }
        return { labels: months.map((m) => m.label), values };
    }, [leads]);

    const recentlyCreatedLeads = useMemo(() => {
        return [...leads]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 6);
    }, [leads]);

    const wonCount = stageCounts.Won;
    const proposalCount = stageCounts.Proposal;
    const conversionRate = percent(wonCount, Math.max(leads.length, 1));
    const closeSoonRate = percent(proposalCount + wonCount, Math.max(leads.length, 1));

    const handleQuickLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSavingLead(true);
        setSubmitError("");
        try {
            await addLead({
                name: quickLeadState.name,
                email: quickLeadState.email,
                status: quickLeadState.status,
            });
            setQuickLeadState({ name: "", email: "", status: "New" });
            setIsQuickLeadOpen(false);
        } catch (err) {
            if (isApiError(err) && [401, 403].includes(err.status)) {
                clearAuthSession();
                router.replace("/login");
                return;
            }
            setSubmitError(err instanceof Error ? err.message : "Unable to create lead.");
        } finally {
            setIsSavingLead(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <LayoutDashboard className="text-primary" /> Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Live executive overview connected to your backend CRM APIs.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <button
                        type="button"
                        onClick={() => void loadLeads(true)}
                        className="px-4 py-2 border border-border rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors"
                    >
                        {refreshing.leads ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                        Refresh
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsQuickLeadOpen((o) => !o)}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    >
                        <Plus size={16} /> Quick Add Lead
                    </button>
                </div>
            </div>

            {isQuickLeadOpen && (
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleQuickLeadSubmit}
                    className="bg-card border border-border rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3 shadow-xl"
                >
                    <input
                        type="text"
                        value={quickLeadState.name}
                        onChange={(e) => setQuickLeadState((s) => ({ ...s, name: e.target.value }))}
                        placeholder="Lead name"
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                        required
                    />
                    <input
                        type="email"
                        value={quickLeadState.email}
                        onChange={(e) => setQuickLeadState((s) => ({ ...s, email: e.target.value }))}
                        placeholder="Lead email"
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                    <select
                        value={quickLeadState.status}
                        onChange={(e) => setQuickLeadState((s) => ({ ...s, status: e.target.value as LeadStage }))}
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                        {LEAD_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button
                        type="submit"
                        disabled={isSavingLead}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70 shadow-lg shadow-primary/20"
                    >
                        {isSavingLead ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                        Save Lead
                    </button>
                </motion.form>
            )}

            {(error || submitError) && (
                <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
                    {error || submitError}
                </div>
            )}

            {loading.leads ? (
                <div className="h-72 grid place-items-center text-muted-foreground">
                    <div className="inline-flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Loading dashboard...
                    </div>
                </div>
            ) : (
                <>
                    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <KpiCard title="Total Leads" value={String(leads.length)} subtitle="All active records" icon={<UserPlus className="w-4 h-4" />} />
                        <KpiCard title="Won Deals" value={String(wonCount)} subtitle={`${conversionRate} conversion`} icon={<BadgeCheck className="w-4 h-4" />} />
                        <KpiCard title="Proposal + Won" value={String(proposalCount + wonCount)} subtitle={`${closeSoonRate} near close`} icon={<Target className="w-4 h-4" />} />
                        <KpiCard title="Qualified" value={String(stageCounts.Qualified)} subtitle="High-intent opportunities" icon={<TrendingUp className="w-4 h-4" />} />
                    </section>
                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <div className="xl:col-span-1">
                            <AIInsights entityId="global" type="lead" />
                        </div>
                        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-sm text-foreground">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 font-sans">Pipeline Funnel</h2>
                            <div className="h-64">
                                <Bar
                                    data={{
                                        labels: [...LEAD_STAGES],
                                        datasets: [{
                                            label: "Leads",
                                            data: LEAD_STAGES.map((s) => stageCounts[s]),
                                            backgroundColor: "rgba(99,102,241,0.7)",
                                            borderRadius: 6,
                                        }],
                                    }}
                                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-sm text-foreground">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 font-sans">Stage Funnel</h2>
                            <div className="h-64">
                                <Bar
                                    data={{
                                        labels: [...LEAD_STAGES],
                                        datasets: [{
                                            label: "Leads",
                                            data: LEAD_STAGES.map((s) => stageCounts[s]),
                                            backgroundColor: "rgba(234,179,8,0.7)",
                                            borderRadius: 6,
                                        }],
                                    }}
                                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }}
                                />
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent Leads</h2>
                                <Link href="/contacts" className="text-xs text-primary hover:underline font-bold">View all</Link>
                            </div>
                            <div className="space-y-3">
                                {recentlyCreatedLeads.map((lead) => (
                                    <Link key={lead.id} href={`/contacts/${lead.id}`} className="flex items-start gap-3 rounded-lg border border-border hover:border-primary/50 p-3 transition-all hover:bg-muted/30">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">{getLeadInitials(lead.name)}</div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold truncate">{lead.name}</p>
                                            <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5 font-sans"><Mail size={11} /> {lead.email || "No email"}</p>
                                            <p className="text-[10px] text-muted-foreground mt-1 font-mono">{normalizeLeadStage(lead.status)} · {formatShortDate(lead.created_at)}</p>
                                        </div>
                                    </Link>
                                ))}
                                {recentlyCreatedLeads.length === 0 && <p className="text-sm text-muted-foreground border border-dashed border-border rounded-lg p-6 text-center italic">No leads found.</p>}
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
