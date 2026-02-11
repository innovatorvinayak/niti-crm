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
        <div className="max-w-6xl mx-auto space-y-8 font-sans p-6 text-foreground min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BarChart3 className="text-primary" /> Reports & Analytics
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">Track your team&apos;s performance and pipeline health.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-foreground text-sm font-medium flex items-center gap-2 transition-colors">
                        <Calendar size={16} /> This Month
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 texture-paper">
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
                        className="bg-card border border-border p-6 rounded-xl hover:border-primary/20 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                                <kpi.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${kpi.trend === "up" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                                }`}>
                                {kpi.change}
                                {kpi.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{kpi.value}</div>
                        <div className="text-xs text-muted-foreground">{kpi.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue Chart (Mock) */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-foreground">Revenue Growth</h3>
                        <select className="bg-transparent text-xs text-muted-foreground border border-border rounded px-2 py-1 focus:outline-none focus:border-primary/50">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end gap-2 justify-between px-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                            <div key={i} className="w-full bg-muted rounded-t-sm relative group/bar hover:bg-primary/20 transition-colors" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded border border-border opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    ${h}k Revenue
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground px-2 font-mono">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* Pipeline Funnel */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-6 text-foreground">Pipeline Funnel</h3>
                    <div className="space-y-4">
                        {pipelineStageData.map((stage, i) => (
                            <div key={stage.label} className="group cursor-pointer">
                                <div className="flex justify-between text-xs mb-1 text-muted-foreground group-hover:text-foreground transition-colors">
                                    <span>{stage.label}</span>
                                    <span>{stage.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${stage.color} opacity-70 group-hover:opacity-100 transition-all duration-500`}
                                        style={{ width: `${stage.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-2xl font-bold text-foreground">12.5%</div>
                                <div className="text-xs text-muted-foreground">Avg. Conversion Rate</div>
                            </div>
                            <div className="text-green-600 bg-green-500/10 p-2 rounded-lg">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table (Simplified) */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                    <h3 className="font-bold text-sm text-foreground">Top Performers</h3>
                    <button className="text-xs text-primary hover:underline">View All</button>
                </div>
                <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="bg-muted text-xs uppercase text-muted-foreground font-medium">
                        <tr>
                            <th className="px-6 py-3">Agent</th>
                            <th className="px-6 py-3">Deals Closed</th>
                            <th className="px-6 py-3">Value</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-3 flex items-center gap-3 text-foreground">
                                    <div className="w-8 h-8 rounded-full bg-muted border border-border" />
                                    Vinayak Furiya
                                </td>
                                <td className="px-6 py-3">1{i}</td>
                                <td className="px-6 py-3 font-mono text-green-600">$12{i},000</td>
                                <td className="px-6 py-3"><span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs border border-green-500/20">Top Tier</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import { CheckSquare } from "lucide-react";
