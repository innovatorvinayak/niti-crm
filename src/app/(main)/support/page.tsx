"use client";

import { motion } from "framer-motion";
import {
    LifeBuoy,
    MessageSquare,
    Smile,
    Frown,
    Clock,
    CheckCircle2,
    AlertCircle,
    UserCheck,
    Search
} from "lucide-react";

export default function SupportPage() {
    return (
        <div className="h-full flex flex-col font-sans text-white bg-black overflow-y-auto custom-scrollbar">

            {/* Header */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400 flex items-center gap-3">
                            <LifeBuoy size={32} className="text-orange-400" />
                            Customer Success
                        </h1>
                        <p className="text-zinc-500 mt-2">Monitor ticket volume, resolution times, and customer satisfaction.</p>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <SupportStat label="Open Tickets" value="42" change="+5" icon={AlertCircle} color="text-amber-400" />
                    <SupportStat label="Avg Response Time" value="1h 24m" change="-12m" icon={Clock} color="text-blue-400" inverse />
                    <SupportStat label="Resolved Today" value="18" change="+3" icon={CheckCircle2} color="text-green-400" />
                    <SupportStat label="Customer CSAT" value="4.8/5" change="+0.1" icon={Smile} color="text-yellow-400" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Ticket Queue */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">Ticket Queue</h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs font-medium text-zinc-400 hover:text-white transition-colors">High Priority</button>
                                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs font-medium text-zinc-400 hover:text-white transition-colors">Oldest</button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { id: "#TCK-921", subject: "Login fails after password reset", customer: "Alice Freeman", priority: "High", status: "Open", time: "2h ago" },
                                { id: "#TCK-920", subject: "Integration with Slack not syncing", customer: "Bob Smith", priority: "Medium", status: "In Progress", time: "4h ago" },
                                { id: "#TCK-918", subject: "Billing invoice PDF missing", customer: "Charlie Davis", priority: "Low", status: "Open", time: "1d ago" },
                                { id: "#TCK-915", subject: "Feature request: Dark mode export", customer: "Diana Prince", priority: "Low", status: "Resolved", time: "2d ago" },
                            ].map((ticket, i) => (
                                <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-2 h-2 rounded-full mt-2 ${ticket.priority === 'High' ? 'bg-red-500 animate-pulse' : ticket.priority === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                                        <div>
                                            <h4 className="text-white font-medium group-hover:text-primary transition-colors">{ticket.subject}</h4>
                                            <div className="text-xs text-zinc-500 flex items-center gap-2 mt-1">
                                                <span className="font-mono">{ticket.id}</span> • <span>{ticket.customer}</span> • <span>{ticket.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${ticket.status === 'Open' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                ticket.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                    'bg-green-500/10 text-green-400 border border-green-500/20'
                                            }`}>
                                            {ticket.status}
                                        </span>
                                        <button className="p-2 bg-white/5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                                            <MessageSquare size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Health & Insights */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5">
                            <h3 className="font-bold text-lg mb-6">Customer Health Pulse</h3>
                            <div className="space-y-4">
                                <HealthBar label="Enterprise Plan" value={88} color="bg-green-500" />
                                <HealthBar label="Pro Plan" value={72} color="bg-yellow-500" />
                                <HealthBar label="Starter Plan" value={65} color="bg-orange-500" />
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                            <h3 className="font-bold text-lg mb-4 text-orange-400 flex items-center gap-2">
                                <AlertCircle size={18} />
                                SLA Warning
                            </h3>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                                3 High Priority tickets are approaching SLA breach (4h). Immediate attention required.
                            </p>
                            <button className="w-full py-2 bg-orange-500 text-black text-sm font-bold rounded-lg hover:bg-white transition-colors">
                                View Tickets
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function SupportStat({ label, value, change, icon: Icon, color, inverse }: any) {
    const isPositive = change.startsWith('+');
    const trendColor = inverse
        ? (isPositive ? 'text-red-400' : 'text-green-400')
        : (isPositive ? 'text-green-400' : 'text-red-400');

    return (
        <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-2">
                <div className={`p-2 bg-white/5 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                </div>
                <div className={`px-2 py-0.5 bg-white/5 rounded text-[10px] font-bold ${trendColor}`}>
                    {change}
                </div>
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mt-1">{label}</p>
        </div>
    );
}

function HealthBar({ label, value, color }: any) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300 font-medium">{label}</span>
                <span className="text-zinc-400 font-mono">{value}%</span>
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
