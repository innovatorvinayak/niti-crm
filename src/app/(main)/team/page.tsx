"use client";

import { motion } from "framer-motion";
import {
    Users,
    UserPlus,
    MoreHorizontal,
    Mail,
    ShieldCheck,
    Clock,
    Trash2,
    Settings,
    Search
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Member = {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Member" | "Viewer";
    status: "Active" | "Pending" | "Inactive";
    lastActive: string;
    avatar?: string;
};

const initialMembers: Member[] = [
    { id: "1", name: "Vinayak Furiya", email: "vinayak@niticrms.com", role: "Admin", status: "Active", lastActive: "Just now" },
    { id: "2", name: "Alice Johnson", email: "alice@niticrms.com", role: "Member", status: "Active", lastActive: "2 hours ago" },
    { id: "3", name: "Bob Smith", email: "bob@niticrms.com", role: "Viewer", status: "Pending", lastActive: "Invited 1 day ago" },
    { id: "4", name: "Charlie Davis", email: "charlie@niticrms.com", role: "Member", status: "Inactive", lastActive: "3 weeks ago" },
];

export default function TeamPage() {
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [filter, setFilter] = useState("All");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Pending": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "Inactive": return "bg-red-500/10 text-zinc-400 border-zinc-700/20";
            default: return "bg-zinc-800 text-zinc-400";
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "Admin": return <ShieldCheck size={14} className="text-primary" />;
            case "Member": return <Users size={14} className="text-blue-400" />;
            default: return <Settings size={14} className="text-zinc-500" />;
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 font-sans p-6 text-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="text-primary" /> Team Management
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage access and roles for your organization.</p>
                </div>
                <button className="px-4 py-2 bg-primary hover:bg-white text-black rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 texture-paper">
                    <UserPlus size={16} /> Invite Member
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex justify-between items-center bg-[#0a0a0a] p-2 rounded-xl border border-white/5">
                <div className="flex gap-2">
                    {["All", "Active", "Pending"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === status
                                    ? "bg-white/10 text-white"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input
                        type="text"
                        placeholder="Search members..."
                        className="bg-transparent border-none text-sm text-white focus:ring-0 pl-9 w-48 placeholder:text-zinc-700"
                    />
                </div>
            </div>

            {/* Member List */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-xs text-zinc-500 uppercase tracking-wider bg-zinc-900/30">
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Last Active</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {members.map((member) => (
                            <motion.tr
                                key={member.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-sm font-bold border border-white/10 text-zinc-300">
                                            {member.name.charAt(0)}{member.name.split(" ")[1]?.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{member.name}</div>
                                            <div className="text-xs text-zinc-500 flex items-center gap-1">
                                                <Mail size={10} /> {member.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                        {getRoleIcon(member.role)}
                                        {member.role}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-zinc-500 flex items-center gap-2">
                                    <Clock size={14} /> {member.lastActive}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors" title="Edit Role">
                                            <Settings size={16} />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-400 transition-colors" title="Remove Member">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                <div className="px-6 py-4 border-t border-white/5 bg-zinc-900/20 text-xs text-zinc-500 flex justify-between items-center">
                    <span>Showing {members.length} of {members.length} members</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/5 transition-colors disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/5 transition-colors disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
