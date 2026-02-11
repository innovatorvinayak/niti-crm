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
        <div className="h-full flex flex-col font-sans text-white bg-black overflow-y-auto custom-scrollbar">

            {/* Header */}
            <div className="p-8 pb-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 flex items-center gap-3">
                            <Trophy size={32} className="text-yellow-400" />
                            Team Leaderboard
                        </h1>
                        <p className="text-zinc-500 mt-2">Sales performance, activity metrics, and monthly targets.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-right">
                            <p className="text-xs text-zinc-500 uppercase tracking-widest">Team Target</p>
                            <p className="text-3xl font-mono font-bold text-white">$450k<span className="text-sm text-zinc-600"> / $500k</span></p>
                        </div>
                        <div className="h-12 w-12 rounded-full border-4 border-zinc-800 flex items-center justify-center">
                            <span className="text-xs font-bold text-green-400">90%</span>
                        </div>
                    </div>
                </div>

                {/* Top Performers (Podium) */}
                <div className="flex justify-center items-end gap-4 mb-12 h-64 relative">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full border-2 border-zinc-500 bg-zinc-800 flex items-center justify-center text-xl font-bold text-zinc-400 relative">
                            BS
                            <div className="absolute -bottom-2 bg-zinc-700 text-white text-[10px] px-2 py-0.5 rounded-full border border-zinc-600">2nd</div>
                        </div>
                        <h3 className="font-bold text-zinc-300">Bob Smith</h3>
                        <div className="text-xs text-zinc-500 font-mono">$112k</div>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "140px" }}
                            className="w-24 bg-gradient-to-t from-zinc-800 to-zinc-700 rounded-t-lg border-x border-t border-white/5 relative group"
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center gap-2 z-10">
                        <div className="absolute top-0 animate-bounce">
                            <Crown size={32} className="text-yellow-400 fill-yellow-400/20" />
                        </div>
                        <div className="w-20 h-20 rounded-full border-4 border-yellow-500 bg-zinc-800 flex items-center justify-center text-2xl font-bold text-yellow-500 shadow-[0_0_30px_-10px_rgba(234,179,8,0.5)] relative mt-8">
                            DP
                            <div className="absolute -bottom-3 bg-yellow-500 text-black font-bold text-[10px] px-3 py-0.5 rounded-full">1st</div>
                        </div>
                        <h3 className="font-bold text-white text-lg">Diana Prince</h3>
                        <div className="text-sm text-yellow-400 font-mono font-bold">$158k</div>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "180px" }}
                            className="w-28 bg-gradient-to-t from-yellow-600/20 to-yellow-500/20 rounded-t-lg border-x border-t border-yellow-500/30 relative group backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full border-2 border-orange-700 bg-zinc-800 flex items-center justify-center text-xl font-bold text-orange-700 relative">
                            AF
                            <div className="absolute -bottom-2 bg-orange-800 text-white text-[10px] px-2 py-0.5 rounded-full border border-orange-700">3rd</div>
                        </div>
                        <h3 className="font-bold text-zinc-400">Alice Freeman</h3>
                        <div className="text-xs text-zinc-500 font-mono">$94k</div>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100px" }}
                            className="w-24 bg-gradient-to-t from-zinc-800 to-zinc-700 rounded-t-lg border-x border-t border-white/5 relative group"
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Performance Table */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden mt-8">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-zinc-400 uppercase tracking-wider text-xs font-semibold">
                            <tr>
                                <th className="p-4">Rep Name</th>
                                <th className="p-4">Deals Closed</th>
                                <th className="p-4">Revenue</th>
                                <th className="p-4">Calls</th>
                                <th className="p-4">Conversion</th>
                                <th className="p-4">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { name: "Diana Prince", deals: 12, revenue: "$158,400", calls: 145, conversion: "28%", rating: 4.9 },
                                { name: "Bob Smith", deals: 8, revenue: "$112,000", calls: 180, conversion: "18%", rating: 4.5 },
                                { name: "Alice Freeman", deals: 6, revenue: "$94,500", calls: 120, conversion: "22%", rating: 4.7 },
                                { name: "Charlie Davis", deals: 5, revenue: "$62,000", calls: 90, conversion: "15%", rating: 4.2 },
                                { name: "Vinayak (You)", deals: 2, revenue: "$24,000", calls: 45, conversion: "12%", rating: 4.0 },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors group cursor-pointer">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-400 border border-white/10 group-hover:border-primary/50 transition-colors">
                                            {row.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-white group-hover:text-primary transition-colors">{row.name}</span>
                                    </td>
                                    <td className="p-4 font-mono text-zinc-300">{row.deals}</td>
                                    <td className="p-4 font-mono font-bold text-green-400">{row.revenue}</td>
                                    <td className="p-4 text-zinc-400 flex items-center gap-1"><Phone size={12} /> {row.calls}</td>
                                    <td className="p-4 text-zinc-300">{row.conversion}</td>
                                    <td className="p-4 flex items-center gap-1 text-yellow-500">
                                        <Star size={12} fill="currentColor" /> {row.rating}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
