"use client";

import { motion } from "framer-motion";
import {
    Trophy,
    Medal,
    TrendingUp,
    Target,
    Phone,
    Mail,
    CalendarCheck,
    Star,
    Crown
} from "lucide-react";

export default function TeamPerformancePage() {
    return (
        <div className="h-full flex flex-col font-sans text-foreground bg-background overflow-y-auto custom-scrollbar">

            {/* Header */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center gap-3">
                            <Trophy size={32} className="text-yellow-500" />
                            Team Leaderboard
                        </h1>
                        <p className="text-muted-foreground mt-2">Sales performance, activity metrics, and monthly targets.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Team Target</p>
                            <p className="text-3xl font-mono font-bold text-foreground">$0<span className="text-sm text-muted-foreground"> / $0</span></p>
                        </div>
                        <div className="h-12 w-12 rounded-full border-4 border-muted flex items-center justify-center">
                            <span className="text-xs font-bold text-muted-foreground">0%</span>
                        </div>
                    </div>
                </div>

                {/* Top Performers (Podium) */}
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-3xl bg-muted/20">
                    <Trophy size={48} className="text-muted-foreground opacity-20 mb-4" />
                    <p className="text-muted-foreground italic text-center">
                        No performance data captured yet.<br/>
                        Start closing deals to see the leaderboard.
                    </p>
                </div>

                {/* Performance Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden mt-8">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                            <tr>
                                <th className="p-4">Rep Name</th>
                                <th className="p-4">Deals Closed</th>
                                <th className="p-4">Revenue</th>
                                <th className="p-4">Calls</th>
                                <th className="p-4">Conversion</th>
                                <th className="p-4">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-muted-foreground italic">
                                        No performance records found for this period.
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
