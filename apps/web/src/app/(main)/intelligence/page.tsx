"use client";

import { motion } from "framer-motion";
import {
    BrainCircuit,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    UserMinus,
    ShieldCheck,
    Activity,
    ArrowRight,
    Search
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type KpiTrend = "up" | "down" | "flat";

type KpiCardProps = {
    label: string;
    value: string | number;
    change: string;
    trend: KpiTrend;
    icon: LucideIcon;
    color: string;
    inverse?: boolean;
};

type FactorBarProps = {
    label: string;
    percent: number;
    color: string;
};

export default function IntelligencePage() {
    return (
        <div className="h-full flex flex-col font-sans text-foreground bg-background overflow-y-auto custom-scrollbar">

            {/* Header */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center gap-3">
                            <BrainCircuit size={32} className="text-purple-600" />
                            Niti Intelligence
                        </h1>
                        <p className="text-muted-foreground mt-2">AI-driven insights on customer health and churn prediction.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Global Health Score</p>
                            <p className="text-3xl font-mono font-bold text-muted-foreground/30">--<span className="text-sm text-muted-foreground">/100</span></p>
                        </div>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <KpiCard
                        label="Predicted Churn"
                        value="0%"
                        change="0%"
                        trend="flat"
                        icon={UserMinus}
                        color="text-zinc-400"
                    />
                    <KpiCard
                        label="Expansion Rev"
                        value="$0"
                        change="0%"
                        trend="flat"
                        icon={TrendingUp}
                        color="text-zinc-400"
                    />
                    <KpiCard
                        label="At Risk ARR"
                        value="$0"
                        change="0%"
                        trend="flat"
                        icon={AlertTriangle}
                        color="text-zinc-400"
                        inverse
                    />
                    <KpiCard
                        label="Engagement"
                        value="N/A"
                        change="Stable"
                        trend="flat"
                        icon={Activity}
                        color="text-zinc-400"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Churn Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">High Risk Accounts</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                <input type="text" placeholder="Search accounts..." className="bg-muted border border-border rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-purple-500/50 w-64" />
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-2xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                                    <tr>
                                        <th className="p-4">Company</th>
                                        <th className="p-4">Health Score</th>
                                        <th className="p-4">Churn Prob.</th>
                                        <th className="p-4">Last Activity</th>
                                        <th className="p-4">AI Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-muted-foreground italic">
                                            No high-risk accounts detected. Gather more data to enable AI prediction.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar Analysis */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-indigo-500" />
                                Retention Insights
                            </h3>
                            <ul className="space-y-4">
                                <li className="text-sm text-muted-foreground italic leading-relaxed">
                                    Awaiting more interaction data to generate retention insights...
                                </li>
                            </ul>
                            <button className="mt-6 w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-600 border border-indigo-500/30 rounded-lg text-sm font-medium transition-all">
                                Generate Full Report
                            </button>
                        </div>

                        <div className="p-6 rounded-2xl bg-card border border-border">
                            <h3 className="font-bold text-lg mb-4">Churn Factors</h3>
                            <div className="space-y-3">
                                <div className="text-center py-4 text-xs text-muted-foreground italic">No factors identified yet.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function KpiCard({ label, value, change, trend, icon: Icon, color, inverse = false }: KpiCardProps) {
    const isPositive = trend === "up";
    const trendColor = inverse
        ? (isPositive ? "text-red-600" : "text-green-600")
        : (isPositive ? "text-green-600" : "text-red-600");

    return (
        <div className="p-5 rounded-2xl bg-card border border-border hover:border-border transition-all group">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:text-foreground transition-colors">
                    <Icon size={18} />
                </div>
                <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-muted ${trendColor}`}>
                    {change}
                </span>
            </div>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</p>
            <h3 className={`text-2xl font-bold mt-1 ${color}`}>{value}</h3>
        </div>
    );
}

function FactorBar({ label, percent, color }: FactorBarProps) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-muted-foreground font-mono">{percent}% Impact</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
}
