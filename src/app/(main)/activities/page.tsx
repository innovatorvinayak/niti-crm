"use client";

import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    Calendar,
    CheckCircle2,
    MessageSquare,
    Filter,
    Search,
    Plus
} from "lucide-react";
import { useState } from "react";

type Activity = {
    id: string;
    type: "Call" | "Email" | "Meeting" | "Task" | "Note";
    title: string;
    description: string;
    user: string; // Initials
    entity: string; // Related Contact or Deal
    time: string;
    status?: "Completed" | "Scheduled" | "Missed";
};

const initialActivities: Activity[] = [
    { id: "1", type: "Call", title: "Discovery Call with TechFlow", description: "Discussed enterprise requirements and timeline.", user: "VF", entity: "TechFlow Enterprise", time: "10:30 AM", status: "Completed" },
    { id: "2", type: "Email", title: "Sent Proposal v2", description: "Updated pricing based on feedback.", user: "AI", entity: "Alice Freeman", time: "11:45 AM", status: "Completed" },
    { id: "3", type: "Meeting", title: "Product Demo", description: "Walkthrough of the new reporting features.", user: "VF", entity: "DesignCo", time: "2:00 PM", status: "Scheduled" },
    { id: "4", type: "Task", title: "Follow up on contract", description: "Check if legal team approved the changes.", user: "DB", entity: "Amazonia Deal", time: "Yesterday", status: "Missed" },
    { id: "5", type: "Note", title: "Internal sync", description: "Team agreed to offer 10% discount if closed by EOM.", user: "VF", entity: "Internal", time: "Yesterday", status: "Completed" },
];

export default function ActivitiesPage() {
    const [filter, setFilter] = useState("All");

    const getIcon = (type: string) => {
        switch (type) {
            case "Call": return <Phone size={14} className="text-blue-400" />;
            case "Email": return <Mail size={14} className="text-yellow-400" />;
            case "Meeting": return <Calendar size={14} className="text-green-400" />;
            case "Task": return <CheckCircle2 size={14} className="text-red-400" />;
            default: return <MessageSquare size={14} className="text-zinc-500" />;
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 font-sans p-6 text-white min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        Activities
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Real-time feed of all team interactions.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-white text-black rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 texture-paper">
                        <Plus size={16} /> Log Activity
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center bg-[#0a0a0a] p-2 rounded-xl border border-white/5">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {["All", "Calls", "Emails", "Meetings", "Tasks"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${filter === type
                                    ? "bg-white/10 text-white"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input
                        type="text"
                        placeholder="Search activities..."
                        className="bg-transparent border-none text-sm text-white focus:ring-0 pl-9 w-48 placeholder:text-zinc-700"
                    />
                </div>
            </div>

            {/* Activity Stream */}
            <div className="space-y-4 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-white/10 z-0" />

                {initialActivities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative z-10 pl-12 group"
                    >
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center z-10 shadow-sm">
                            {getIcon(activity.type)}
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 hover:border-primary/20 transition-colors group-hover:bg-white/[0.02]">
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-white">{activity.title}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border border-white/5 ${activity.status === "Completed" ? "bg-green-500/10 text-green-400" :
                                            activity.status === "Scheduled" ? "bg-blue-500/10 text-blue-400" :
                                                "bg-red-500/10 text-red-400"
                                        }`}>
                                        {activity.status}
                                    </span>
                                </div>
                                <span className="text-xs text-zinc-500 font-mono">{activity.time}</span>
                            </div>

                            <p className="text-zinc-400 text-sm mb-3 leading-relaxed">
                                {activity.description}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-zinc-300 border border-white/10">
                                        {activity.user}
                                    </div>
                                    <span className="text-xs text-zinc-600">logged via <span className="text-zinc-400">{activity.type}</span></span>
                                </div>
                                <div className="text-xs text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">
                                    {activity.entity}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
