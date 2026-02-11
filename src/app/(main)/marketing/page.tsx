"use client";

import { motion } from "framer-motion";
import {
    Megaphone,
    MousePointer2,
    Globe,
    Smartphone,
    TrendingUp,
    Users,
    ArrowUpRight,
    PieChart,
    BarChart3,
    Info
} from "lucide-react";

export default function MarketingPage() {
    return (
        <div className="h-full flex flex-col font-sans text-foreground bg-background overflow-y-auto custom-scrollbar">

            {/* Header */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 flex items-center gap-3">
                            <Megaphone size={32} className="text-pink-500" />
                            Marketing Analytics
                        </h1>
                        <p className="text-muted-foreground mt-2">Track campaign performance, traffic sources, and conversion funnels.</p>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <MetricCard label="Total Impressions" value="1.2M" change="+18%" icon={Globe} color="text-pink-400" tooltip="The total number of times your content was displayed to users." />
                    <MetricCard label="Click Through Rate" value="4.8%" change="+0.5%" icon={MousePointer2} color="text-blue-400" tooltip="The percentage of impressions that resulted in a click (CTR)." />
                    <MetricCard label="Cost Per Lead" value="$14.20" change="-12%" icon={TrendingUp} color="text-green-400" inverse tooltip="The average amount spent on marketing to acquire a single lead (CPL)." />
                    <MetricCard label="Social Traffic" value="42%" change="+5%" icon={Smartphone} color="text-purple-400" tooltip="Percentage of total website traffic coming from social media platforms." />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sources Chart (Mock) */}
                    <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 relative overflow-hidden group hover:border-muted-foreground/20 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-foreground">Traffic Source Attribution</h3>
                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                                <BarChart3 size={18} />
                            </button>
                        </div>
                        {/* Mock Chart Area */}
                        <div className="h-64 flex items-end gap-2 justify-between px-4 pb-2 border-b border-border">
                            <ChartBar height="40%" label="Direct" color="bg-zinc-500" />
                            <ChartBar height="65%" label="Organic" color="bg-green-500" />
                            <ChartBar height="80%" label="Paid Search" color="bg-blue-500" />
                            <ChartBar height="55%" label="Social" color="bg-purple-500" />
                            <ChartBar height="30%" label="Email" color="bg-orange-500" />
                            <ChartBar height="20%" label="Referral" color="bg-zinc-400" />
                        </div>
                        <div className="grid grid-cols-6 text-center mt-2 text-xs text-muted-foreground uppercase tracking-wider font-mono">
                            <span>Direct</span>
                            <span>Google</span>
                            <span>Paid</span>
                            <span>Social</span>
                            <span>Email</span>
                            <span>Ref</span>
                        </div>
                    </div>

                    {/* Funnel */}
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                        <h3 className="font-bold text-lg mb-4 text-foreground">Conversion Funnel</h3>
                        <div className="space-y-1">
                            <FunnelStep label="Impressions" count="1,240,000" percent={100} color="bg-zinc-400" />
                            <FunnelStep label="Site Visits" count="85,200" percent={65} color="bg-zinc-500" />
                            <FunnelStep label="Lead Form" count="4,320" percent={40} color="bg-zinc-600" />
                            <FunnelStep label="MQL" count="1,850" percent={25} color="bg-pink-300" />
                            <FunnelStep label="SQL" count="620" percent={15} color="bg-pink-500" />
                            <FunnelStep label="Closed Won" count="142" percent={8} color="bg-pink-600" />
                        </div>
                        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Yield</span>
                            <span className="text-xl font-bold text-foreground font-mono">2.8%</span>
                        </div>
                    </div>
                </div>

                {/* Campaigns Table */}
                <div className="mt-8 bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h3 className="font-bold text-lg text-foreground">Top Performing Campaigns</h3>
                        <button className="text-muted-foreground hover:text-foreground transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            View All <ArrowUpRight size={12} />
                        </button>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                            <tr>
                                <th className="p-4">Campaign Name</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Spent</th>
                                <th className="p-4">Revenue</th>
                                <th className="p-4">ROI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[
                                { name: "Black Friday Promo", status: "Active", spent: "$4,500", revenue: "$28,400", roi: "6.3x" },
                                { name: "Q3 Webinar Series", status: "Completed", spent: "$1,200", revenue: "$5,800", roi: "4.8x" },
                                { name: "LinkedIn Retargeting", status: "Active", spent: "$2,800", revenue: "$9,200", roi: "3.2x" },
                                { name: "Cold Email Blast #4", status: "Paused", spent: "$150", revenue: "$0", roi: "0x" },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-muted/50 transition-colors group">
                                    <td className="p-4 font-bold text-foreground">{row.name}</td>
                                    <td className="p-4"><span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${row.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-muted text-muted-foreground'}`}>{row.status}</span></td>
                                    <td className="p-4 text-muted-foreground font-mono">{row.spent}</td>
                                    <td className="p-4 text-foreground font-mono font-bold">{row.revenue}</td>
                                    <td className={`p-4 font-mono font-bold ${row.roi.startsWith('0') ? 'text-muted-foreground' : 'text-green-600'}`}>{row.roi}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

function MetricCard({ label, value, change, icon: Icon, color, inverse, tooltip }: any) {
    const isPositive = change.startsWith('+');
    const trendColor = inverse
        ? (isPositive ? 'text-red-400' : 'text-green-400')
        : (isPositive ? 'text-green-400' : 'text-red-400');

    return (
        <div className="p-6 bg-card border border-border rounded-2xl hover:border-muted-foreground/20 transition-all group overflow-visible">
            <div className="flex justify-between items-start mb-2">
                <div className={`p-2 bg-muted rounded-lg ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                </div>
                <div className={`px-2 py-0.5 bg-muted rounded text-[10px] font-bold ${trendColor}`}>
                    {change}
                </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mt-2">{value}</h3>
            <div className="flex items-center mt-1">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</p>
                {tooltip && <TooltipTrigger text={tooltip} />}
            </div>
        </div>
    );
}

function ChartBar({ height, label, color }: any) {
    return (
        <div className="flex flex-col justify-end h-full w-full group relative">
            <motion.div
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{ duration: 1, ease: 'circOut' }}
                className={`w-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity ${color}`}
            />
        </div>
    );
}

function FunnelStep({ label, count, percent, color }: any) {
    return (
        <div className="relative h-12 flex items-center">
            {/* Funnel Shape Logic (Simplified with CSS widths) */}
            <div className={`mx-auto h-10 flex items-center justify-between px-4 rounded font-medium text-xs text-white shadow-lg ${color}`} style={{ width: `${percent}%`, minWidth: '120px' }}>
                <span>{label}</span>
                <span className="font-mono opacity-80">{count}</span>
            </div>
        </div>
    );
}
