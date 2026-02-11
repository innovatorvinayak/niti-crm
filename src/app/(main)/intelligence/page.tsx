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
                            <p className="text-3xl font-mono font-bold text-green-600">88.5<span className="text-sm text-muted-foreground">/100</span></p>
                        </div>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <KpiCard
                        label="Predicted Churn"
                        value="2.4%"
                        change="-0.8%"
                        trend="down"
                        icon={UserMinus}
                        color="text-green-600"
                    />
                    <KpiCard
                        label="Expansion Rev"
                        value="$12.5k"
                        change="+15%"
                        trend="up"
                        icon={TrendingUp}
                        color="text-blue-600"
                    />
                    <KpiCard
                        label="At Risk ARR"
                        value="$4,200"
                        change="+5%"
                        trend="up"
                        icon={AlertTriangle}
                        color="text-red-600"
                        inverse
                    />
                    <KpiCard
                        label="Engagement"
                        value="High"
                        change="Stable"
                        trend="flat"
                        icon={Activity}
                        color="text-purple-600"
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
                                    {[
                                        { name: "Acme Corp", domain: "acme.com", health: 45, churn: "High (78%)", last: "14 days ago", action: "Schedule QBR" },
                                        { name: "Globex Inc", domain: "globex.io", health: 62, churn: "Med (45%)", last: "3 days ago", action: "Send Case Study" },
                                        { name: "Soylent Corp", domain: "soylent.net", health: 20, churn: "Critical (92%)", last: "28 days ago", action: "Executive Call" },
                                        { name: "Initech", domain: "initech.org", health: 58, churn: "Med (40%)", last: "5 days ago", action: "Feature Update" },
                                        { name: "Umbrella Corp", domain: "umbrella.bio", health: 35, churn: "High (65%)", last: "10 days ago", action: "Offer Discount" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-muted/30 transition-colors group">
                                            <td className="p-4 font-medium text-foreground flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                                                    {row.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-foreground">{row.name}</div>
                                                    <div className="text-xs text-muted-foreground">{row.domain}</div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${row.health < 40 ? 'bg-red-500' : row.health < 70 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${row.health}%` }}></div>
                                                    </div>
                                                    <span className={`text-xs font-mono ${row.health < 40 ? 'text-red-600' : row.health < 70 ? 'text-yellow-600' : 'text-green-600'}`}>{row.health}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 font-mono text-foreground">{row.churn}</td>
                                            <td className="p-4 text-muted-foreground">{row.last}</td>
                                            <td className="p-4">
                                                <button className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-500 hover:underline">
                                                    {row.action} <ArrowRight size={12} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
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
                                <li className="text-sm text-foreground leading-relaxed">
                                    <span className="font-bold text-indigo-600">Insight:</span> Customers who use the &quot;Reporting&quot; module are <span className="text-green-600">40% less likely</span> to churn.
                                </li>
                                <div className="h-px bg-border"></div>
                                <li className="text-sm text-foreground leading-relaxed">
                                    <span className="font-bold text-red-600">Warning:</span> 12 accounts have not logged in for {'>'} 14 days. This is a leading indicator of churn.
                                </li>
                                <div className="h-px bg-border"></div>
                                <li className="text-sm text-foreground leading-relaxed">
                                    <span className="font-bold text-yellow-600">Opportunity:</span> 5 accounts are approaching their usage limits. Upsell potential detected.
                                </li>
                            </ul>
                            <button className="mt-6 w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-600 border border-indigo-500/30 rounded-lg text-sm font-medium transition-all">
                                Generate Full Report
                            </button>
                        </div>

                        <div className="p-6 rounded-2xl bg-card border border-border">
                            <h3 className="font-bold text-lg mb-4">Churn Factors</h3>
                            <div className="space-y-3">
                                <FactorBar label="Support Tickets > 5" percent={85} color="bg-red-500" />
                                <FactorBar label="Low Login Frequency" percent={62} color="bg-orange-500" />
                                <FactorBar label="Billing Issues" percent={45} color="bg-yellow-500" />
                                <FactorBar label="Product Bugs" percent={30} color="bg-blue-500" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function KpiCard({ label, value, change, trend, icon: Icon, color, inverse = false }: any) {
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

function FactorBar({ label, percent, color }: any) {
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
