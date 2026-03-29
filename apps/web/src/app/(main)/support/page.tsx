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
import type { LucideIcon } from "lucide-react";

type SupportStatProps = {
    label: string;
    value: string | number;
    change: string;
    icon: LucideIcon;
    color: string;
    inverse?: boolean;
};

type HealthBarProps = {
    label: string;
    value: number;
    color: string;
};

export default function SupportPage() {
    return (
        <div className="h-full flex flex-col font-sans text-foreground bg-background overflow-y-auto custom-scrollbar">

            {/* Header */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 flex items-center gap-3">
                            <LifeBuoy size={32} className="text-orange-500" />
                            Customer Success
                        </h1>
                        <p className="text-muted-foreground mt-2">Monitor ticket volume, resolution times, and customer satisfaction.</p>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <SupportStat label="Open Tickets" value="0" change="0" icon={AlertCircle} color="text-amber-500" />
                    <SupportStat label="Avg Response Time" value="--m" change="0m" icon={Clock} color="text-blue-500" inverse />
                    <SupportStat label="Resolved Today" value="0" change="0" icon={CheckCircle2} color="text-green-500" />
                    <SupportStat label="Customer CSAT" value="0/5" change="0" icon={Smile} color="text-yellow-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Ticket Queue */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">Ticket Queue</h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">High Priority</button>
                                <button className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">Oldest</button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground italic">
                                No open support tickets. Your queue is empty!
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Health & Insights */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-card border border-border">
                            <h3 className="font-bold text-lg mb-6">Customer Health Pulse</h3>
                            <div className="text-center py-6 text-muted-foreground italic text-sm">
                                 Awaiting customer health metrics...
                             </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                            <h3 className="font-bold text-lg mb-4 text-orange-500 flex items-center gap-2">
                                <AlertCircle size={18} />
                                SLA Warning
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                All tickets are currently within their SLA response times.
                            </p>
                            <button className="w-full py-2 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors">
                                View Tickets
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function SupportStat({ label, value, change, icon: Icon, color, inverse }: SupportStatProps) {
    const isPositive = change.startsWith('+');
    const trendColor = inverse
        ? (isPositive ? 'text-red-600' : 'text-green-600')
        : (isPositive ? 'text-green-600' : 'text-red-600');

    return (
        <div className="p-6 bg-card border border-border rounded-2xl hover:border-border transition-all group">
            <div className="flex justify-between items-start mb-2">
                <div className={`p-2 bg-muted rounded-lg ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                </div>
                <div className={`px-2 py-0.5 bg-muted rounded text-[10px] font-bold ${trendColor}`}>
                    {change}
                </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mt-2">{value}</h3>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-1">{label}</p>
        </div>
    );
}

function HealthBar({ label, value, color }: HealthBarProps) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground font-medium">{label}</span>
                <span className="text-muted-foreground font-mono">{value}%</span>
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
