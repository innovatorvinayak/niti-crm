"use client";

import { motion } from "framer-motion";
import {
    Mail,
    Send,
    MousePointer2,
    MessageCircle,
    Plus,
    MoreHorizontal,
    PauseCircle,
    PlayCircle,
    BarChart2,
    Copy,
    Trash2
} from "lucide-react";
import { useState } from "react";

type Campaign = {
    id: string;
    name: string;
    status: "active" | "paused" | "draft";
    sent: number;
    openRate: number;
    clickRate: number;
    replyRate: number;
    step: number;
};

const initialCampaigns: Campaign[] = [
    { id: "1", name: "Q3 Cold Outreach - SaaS Founders", status: "active", sent: 1240, openRate: 42.5, clickRate: 12.8, replyRate: 5.2, step: 3 },
    { id: "2", name: "Webinar Invite - 'AI in 2026'", status: "paused", sent: 500, openRate: 68.0, clickRate: 25.4, replyRate: 10.1, step: 2 },
    { id: "3", name: "Churn Re-engagement", status: "draft", sent: 0, openRate: 0, clickRate: 0, replyRate: 0, step: 1 },
];

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

    return (
        <div className="h-full flex flex-col font-sans text-white bg-[#050505]">

            <div className="p-8 pb-4 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            <Mail size={24} className="text-blue-400" />
                            Email Campaigns
                        </h1>
                        <p className="text-zinc-500 text-sm mt-1">Manage your outreach sequences and track performance.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-white transition-colors shadow-[0_0_15px_-3px_rgba(245,245,220,0.3)]">
                        <Plus size={16} /> New Campaign
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <StatBox label="Emails Sent" value="8,450" change="+12%" icon={Send} />
                    <StatBox label="Avg. Open Rate" value="48.2%" change="+2.4%" icon={Mail} />
                    <StatBox label="Avg. Click Rate" value="15.8%" change="-1.1%" icon={MousePointer2} />
                    <StatBox label="Replied" value="4.2%" change="+0.5%" icon={MessageCircle} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="grid grid-cols-1 gap-4">
                    {campaigns.map((camp) => (
                        <motion.div
                            key={camp.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${camp.status === 'active' ? 'bg-green-500/10 text-green-400' : camp.status === 'paused' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-zinc-800 text-zinc-500'}`}>
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors cursor-pointer">{camp.name}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${camp.status === 'active' ? 'border-green-500/20 text-green-400 bg-green-500/5' :
                                                    camp.status === 'paused' ? 'border-yellow-500/20 text-yellow-400 bg-yellow-500/5' :
                                                        'border-zinc-700 text-zinc-500 bg-zinc-800'
                                                }`}>
                                                {camp.status}
                                            </span>
                                            <span className="text-zinc-500 text-xs">• Created 3 days ago by VF</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                        {camp.status === 'active' ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                                    </button>
                                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                        <BarChart2 size={18} />
                                    </button>
                                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Campaign Stats Grid */}
                            <div className="grid grid-cols-4 gap-4 bg-zinc-900/30 rounded-lg p-4 border border-white/5">
                                <div className="text-center border-r border-white/5">
                                    <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Steps</span>
                                    <span className="text-white font-mono font-bold text-lg">{camp.step}</span>
                                </div>
                                <div className="text-center border-r border-white/5">
                                    <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Open Rate</span>
                                    <span className="text-white font-mono font-bold text-lg">{camp.openRate}%</span>
                                </div>
                                <div className="text-center border-r border-white/5">
                                    <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Click Rate</span>
                                    <span className="text-white font-mono font-bold text-lg">{camp.clickRate}%</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Reply Rate</span>
                                    <span className="text-white font-mono font-bold text-lg">{camp.replyRate}%</span>
                                </div>
                            </div>

                            {/* Mini Progress Bar */}
                            <div className="mt-4 flex items-center gap-3">
                                <span className="text-xs text-zinc-500 w-24">Sending...</span>
                                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
                                </div>
                                <span className="text-xs text-zinc-400 font-mono">45%</span>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value, change, icon: Icon }: any) {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-white/10 transition-all">
            <div className="flex justify-between items-start">
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{label}</span>
                <Icon size={14} className="text-zinc-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white tracking-tight">{value}</div>
            <div className={`text-xs mt-1 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                {change} <span className="text-zinc-600">vs last month</span>
            </div>
        </div>
    );
}
