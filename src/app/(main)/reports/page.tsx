"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    TrendingUp,
    Users,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Download
} from "lucide-react";

export default function ReportsPage() {
    const kpis = [
        { label: "Total Revenue", value: "$124,500", change: "+12%", trend: "up", icon: TrendingUp },
        { label: "Deals Closed", value: "45", change: "+5%", trend: "up", icon: CheckSquare },
        { label: "Pipeline Value", value: "$450,200", change: "-2%", trend: "down", icon: BarChart3 },
        { label: "Avg. Deal Size", value: "$2,750", change: "+8%", trend: "up", icon: PieChart },
    ];

    const pipelineStageData = [
        { label: "New", value: 35, color: "bg-blue-500" },
        { label: "Contacted", value: 45, color: "bg-purple-500" },
        { label: "Qualified", value: 60, color: "bg-yellow-500" },
        { label: "Proposal", value: 25, color: "bg-orange-500" },
        { label: "Won", value: 80, color: "bg-green-500" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 font-sans p-6 text-white min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BarChart3 className="text-primary" /> Reports & Analytics
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Track your team's performance and pipeline health.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors">
                        <Calendar size={16} /> This Month
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-white text-black rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 texture-paper">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, index) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl hover:border-primary/20 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-white/5 rounded-lg text-zinc-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                                <kpi.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${kpi.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                }`}>
                                {kpi.change}
                                {kpi.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{kpi.value}</div>
                        <div className="text-xs text-zinc-500">{kpi.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue Chart (Mock) */}
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Revenue Growth</h3>
                        <select className="bg-transparent text-xs text-zinc-500 border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-white/20">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end gap-2 justify-between px-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                            <div key={i} className="w-full bg-white/5 rounded-t-sm relative group/bar hover:bg-primary/20 transition-colors" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    ${h}k Revenue
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-zinc-500 px-2 font-mono">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* Pipeline Funnel */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-6">Pipeline Funnel</h3>
                    <div className="space-y-4">
                        {pipelineStageData.map((stage, i) => (
                            <div key={stage.label} className="group cursor-pointer">
                                <div className="flex justify-between text-xs mb-1 text-zinc-400 group-hover:text-white transition-colors">
                                    <span>{stage.label}</span>
                                    <span>{stage.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${stage.color} opacity-70 group-hover:opacity-100 transition-all duration-500`}
                                        style={{ width: `${stage.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-white">12.5%</div>
                                <div className="text-xs text-zinc-500">Avg. Conversion Rate</div>
                            </div>
                            <div className="text-green-400 bg-green-500/10 p-2 rounded-lg">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table (Simplified) */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-sm">Top Performers</h3>
                    <button className="text-xs text-primary hover:underline">View All</button>
                </div>
                <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="bg-white/[0.02] text-xs uppercase text-zinc-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Agent</th>
                            <th className="px-6 py-3">Deals Closed</th>
                            <th className="px-6 py-3">Value</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-3 flex items-center gap-3 text-white">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
                                    Vinayak Furiya
                                </td>
                                <td className="px-6 py-3">1{i}</td>
                                <td className="px-6 py-3 font-mono text-green-400">$12{i},000</td>
                                <td className="px-6 py-3"><span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">Top Tier</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import { CheckSquare } from "lucide-react";
