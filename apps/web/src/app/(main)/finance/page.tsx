"use client";

import { motion } from "framer-motion";
import {
    CreditCard,
    Banknote,
    TrendingUp,
    TrendingDown,
    Download,
    Filter,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Info
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FinanceCardProps = {
    label: string;
    value: string | number;
    change: string;
    isPositive: boolean;
    icon: LucideIcon;
    sub: string;
    alert?: boolean;
    neutral?: boolean;
    tooltip?: string;
};

type ProgressBarProps = {
    label: string;
    value: number;
    color: string;
    amount: string;
};

export default function FinancePage() {
    return (
        <div className="h-full flex flex-col font-sans text-foreground bg-background overflow-y-auto custom-scrollbar">

            {/* Header */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 flex items-center gap-3">
                            <Banknote size={32} className="text-emerald-500" />
                            Financial Overview
                        </h1>
                        <p className="text-muted-foreground mt-2">Track revenue, spending, and financial health.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors border border-border flex items-center gap-2 text-foreground">
                            <Calendar size={16} /> Last 30 Days
                        </button>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <FinanceCard
                        label="Total Revenue"
                        value="$0"
                        change="0%"
                        isPositive={true}
                        icon={TrendingUp}
                        sub="vs last month"
                        tooltip="Total income from all sales sources before any expenses."
                    />
                    <FinanceCard
                        label="Outstanding Invoices"
                        value="$0"
                        change="0 Invoices"
                        isPositive={false}
                        icon={Clock}
                        sub="Overdue > 7 days"
                        tooltip="Total value of sent invoices that haven't been paid yet."
                    />
                    <FinanceCard
                        label="Net Profit"
                        value="$0"
                        change="0%"
                        isPositive={true}
                        icon={Banknote}
                        sub="Margin: 0%"
                        tooltip="Total Revenue minus Total Expenses (Gross Profit)."
                    />
                    <FinanceCard
                        label="Expenses"
                        value="$0"
                        change="0%"
                        isPositive={false}
                        icon={CreditCard}
                        sub="Within budget"
                        neutral 
                        tooltip="Total costs incurred including payroll, software, and marketing."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Transactions Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-foreground">Recent Transactions</h3>
                            <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg bg-muted/30">
                                <Filter size={16} />
                            </button>
                        </div>

                        <div className="bg-card border border-border rounded-2xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                                    <tr>
                                        <th className="p-4">Transaction / ID</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Method</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-muted-foreground italic">
                                            No recent transactions found.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Breakdown / Sidebar */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-card border border-border">
                            <h3 className="font-bold text-lg mb-6 text-foreground">Expense Breakdown</h3>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground italic text-center py-4">No data available.</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-muted border border-border relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2 text-foreground">Projected ARR</h3>
                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/10">$0</div>
                                <p className="text-xs text-muted-foreground mt-2">Projection will update based on data intake.</p>
                            </div>
                            <div className="absolute -bottom-4 -right-4 text-muted-foreground/10">
                                <TrendingUp size={120} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function TooltipTrigger({ text }: { text: string }) {
    if (!text) return null;
    return (
        <div className="group/tooltip relative inline-flex items-center justify-center transform hover:scale-110 transition-transform ml-2">
            <Info size={12} className="text-muted-foreground hover:text-foreground cursor-help" />
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2.5 bg-foreground border border-border rounded-xl shadow-2xl z-50 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity text-[10px] text-background text-center leading-relaxed backdrop-blur-md">
                {text}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground"></div>
            </div>
        </div>
    );
}

function FinanceCard({ label, value, change, isPositive, icon: Icon, sub, alert, neutral, tooltip }: FinanceCardProps) {
    let changeColor = neutral ? "text-zinc-400" : (isPositive ? "text-emerald-400" : "text-rose-400");
    if (alert) changeColor = "text-amber-400";

    return (
        <div className="p-6 rounded-2xl bg-card border border-border hover:border-muted-foreground/20 transition-all group relative overflow-hidden">
            {alert && <div className="absolute top-0 right-0 p-2"><div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div></div>}

            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-muted rounded-xl text-muted-foreground group-hover:text-foreground transition-colors">
                    <Icon size={20} />
                </div>
                <div className={`text-xs font-mono font-bold px-2 py-1 rounded-md bg-muted ${changeColor}`}>
                    {change}
                </div>
            </div>

            <h3 className="text-3xl font-bold text-foreground tracking-tight">{value}</h3>
            <div className="flex items-center mt-1">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</p>
                {tooltip && <TooltipTrigger text={tooltip} />}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">{sub}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        Paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        Processed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        Overdue: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };

    return (
        <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium border ${styles[status] || "bg-muted text-muted-foreground"}`}>
            {status}
        </span>
    );
}

function ProgressBar({ label, value, color, amount }: ProgressBarProps) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-foreground font-medium">{label}</span>
                <span className="text-muted-foreground font-mono">{amount} ({(value)}%)</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
}
