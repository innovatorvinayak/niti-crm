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

export default function FinancePage() {
    return (
        <div className="h-full flex flex-col font-sans text-white bg-black overflow-y-auto custom-scrollbar">

            {/* Header */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center gap-3">
                            <Banknote size={32} className="text-emerald-400" />
                            Financial Overview
                        </h1>
                        <p className="text-zinc-500 mt-2">Track revenue, spending, and financial health.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/10 flex items-center gap-2">
                            <Calendar size={16} /> Last 30 Days
                        </button>
                        <button className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-white transition-colors flex items-center gap-2">
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <FinanceCard
                        label="Total Revenue"
                        value="$124,500"
                        change="+15.2%"
                        isPositive={true}
                        icon={TrendingUp}
                        sub="vs last month"
                        tooltip="Total income from all sales sources before any expenses."
                    />
                    <FinanceCard
                        label="Outstanding Invoices"
                        value="$12,420"
                        change="8 Invoices"
                        isPositive={false}
                        icon={Clock}
                        sub="Overdue > 7 days"
                        alert
                        tooltip="Total value of sent invoices that haven't been paid yet."
                    />
                    <FinanceCard
                        label="Net Profit"
                        value="$86,300"
                        change="+8.4%"
                        isPositive={true}
                        icon={Banknote}
                        sub="Margin: 69%"
                        tooltip="Total Revenue minus Total Expenses (Gross Profit)."
                    />
                    <FinanceCard
                        label="Expenses"
                        value="$38,200"
                        change="+2.1%"
                        isPositive={false} // Expenses up is usually bad visually, let's keep neutral or use red/green logic carefully
                        icon={CreditCard}
                        sub="Below budget"
                        neutral // custom prop for styling
                        tooltip="Total costs incurred including payroll, software, and marketing."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Transactions Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">Recent Transactions</h3>
                            <button className="text-zinc-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5">
                                <Filter size={16} />
                            </button>
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-zinc-400 uppercase tracking-wider text-xs font-semibold">
                                    <tr>
                                        <th className="p-4">Transaction / ID</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Method</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { id: "#INV-2024-001", client: "Acme Corp", date: "Oct 24, 2024", amount: "$12,450.00", status: "Paid", method: "Wire Transfer" },
                                        { id: "#INV-2024-002", client: "Globex Inc", date: "Oct 23, 2024", amount: "$4,200.00", status: "Pending", method: "Stripe" },
                                        { id: "#EXP-2024-089", client: "AWS Services", date: "Oct 22, 2024", amount: "-$850.00", status: "Processed", method: "Credit Card" },
                                        { id: "#INV-2024-003", client: "Soylent Corp", date: "Oct 21, 2024", amount: "$8,900.00", status: "Overdue", method: "Wire Transfer" },
                                        { id: "#INV-2024-004", client: "Initech", date: "Oct 20, 2024", amount: "$2,100.00", status: "Paid", method: "PayPal" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4">
                                                <div className="font-bold text-white">{row.client}</div>
                                                <div className="text-xs text-zinc-500 font-mono">{row.id}</div>
                                            </td>
                                            <td className="p-4 text-zinc-400">{row.date}</td>
                                            <td className={`p-4 font-mono font-bold ${row.amount.startsWith('-') ? 'text-zinc-400' : 'text-white'}`}>
                                                {row.amount}
                                            </td>
                                            <td className="p-4">
                                                <StatusBadge status={row.status} />
                                            </td>
                                            <td className="p-4 text-zinc-500 flex items-center gap-2">
                                                {row.method === 'Stripe' || row.method === 'PayPal' || row.method === 'Credit Card' ? <CreditCard size={12} /> : <Banknote size={12} />}
                                                {row.method}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Breakdown / Sidebar */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5">
                            <h3 className="font-bold text-lg mb-6">Expense Breakdown</h3>
                            <div className="space-y-4">
                                <ProgressBar label="Infrastructure (AWS)" value={45} color="bg-blue-500" amount="$32k" />
                                <ProgressBar label="Payroll" value={30} color="bg-purple-500" amount="$21k" />
                                <ProgressBar label="Marketing Ads" value={15} color="bg-emerald-500" amount="$10k" />
                                <ProgressBar label="Software Subscriptions" value={10} color="bg-amber-500" amount="$7k" />
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2 text-white">Projected ARR</h3>
                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">$1.2M</div>
                                <p className="text-xs text-zinc-400 mt-2">Based on current pipeline velocity and closure rates.</p>
                            </div>
                            <div className="absolute -bottom-4 -right-4 text-white/5">
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
            <Info size={12} className="text-zinc-500 hover:text-white cursor-help" />
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2.5 bg-[#1a1a1a] border border-zinc-700/50 rounded-xl shadow-2xl z-50 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity text-[10px] text-zinc-300 text-center leading-relaxed backdrop-blur-md">
                {text}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1a1a1a]"></div>
            </div>
        </div>
    );
}

function FinanceCard({ label, value, change, isPositive, icon: Icon, sub, alert, neutral, tooltip }: any) {
    let changeColor = neutral ? "text-zinc-400" : (isPositive ? "text-emerald-400" : "text-rose-400");
    if (alert) changeColor = "text-amber-400";

    return (
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
            {alert && <div className="absolute top-0 right-0 p-2"><div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div></div>}

            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl text-zinc-400 group-hover:text-white transition-colors">
                    <Icon size={20} />
                </div>
                <div className={`text-xs font-mono font-bold px-2 py-1 rounded-md bg-white/5 ${changeColor}`}>
                    {change}
                </div>
            </div>

            <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            <div className="flex items-center mt-1">
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{label}</p>
                {tooltip && <TooltipTrigger text={tooltip} />}
            </div>
            <p className="text-[10px] text-zinc-600 mt-2">{sub}</p>
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
        <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium border ${styles[status] || "bg-zinc-800 text-zinc-400"}`}>
            {status}
        </span>
    );
}

function ProgressBar({ label, value, color, amount }: any) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300 font-medium">{label}</span>
                <span className="text-zinc-400 font-mono">{amount} ({(value)}%)</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
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
