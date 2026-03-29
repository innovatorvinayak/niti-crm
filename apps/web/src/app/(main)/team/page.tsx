"use client";

import { motion } from "framer-motion";
import {
    Users,
    UserPlus,
    Mail,
    ShieldCheck,
    Clock,
    Trash2,
    Settings,
    Search
} from "lucide-react";
import { useState, useMemo } from "react";
import { useUser } from "@/lib/UserContext";

type Member = {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Member" | "Viewer";
    status: "Active" | "Pending" | "Inactive";
    lastActive: string;
};

export default function TeamPage() {
    const { user } = useUser();
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Simulate team members including the current user
    const members = useMemo(() => {
        const list: Member[] = [];
        if (user) {
            list.push({
                id: user.id,
                name: user.name,
                email: user.email,
                role: (user.role.charAt(0).toUpperCase() + user.role.slice(1)) as Member["role"],
                status: "Active",
                lastActive: "Just now",
            });
        }
        return list;
    }, [user]);

    const filteredMembers = useMemo(() => {
        return members.filter(m => {
            if (filter !== "All" && m.status !== filter) return false;
            const q = searchTerm.toLowerCase();
            return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
        });
    }, [members, filter, searchTerm]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-500/10 text-green-600 border-green-500/20";
            case "Pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
            case "Inactive": return "bg-red-500/10 text-muted-foreground border-border";
            default: return "bg-muted text-muted-foreground";
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
        <div className="max-w-6xl mx-auto space-y-8 font-sans p-6 text-foreground">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="text-primary" /> Team Management
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage access and roles for your organization.</p>
                </div>
                {user?.role === 'admin' && (
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 texture-paper">
                        <UserPlus size={16} /> Invite Member
                    </button>
                )}
            </div>

            <div className="flex justify-between items-center bg-card p-2 rounded-xl border border-border">
                <div className="flex gap-2">
                    {["All", "Active", "Pending"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === status
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search members..."
                        className="bg-transparent border-none text-sm text-foreground focus:ring-0 pl-9 w-48 placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider bg-muted/50">
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Last Active</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredMembers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic font-sans text-sm">
                                    No team members found meeting the criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredMembers.map((member) => (
                                <motion.tr
                                    key={member.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="group hover:bg-muted/30 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                                                {member.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground text-sm">{member.name} {member.id === user?.id && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded ml-1 tracking-tighter uppercase font-bold">You</span>}</div>
                                                <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                                    <Mail size={10} /> {member.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                            {getRoleIcon(member.role)}
                                            {member.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${getStatusColor(member.status)}`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-muted-foreground flex items-center gap-2">
                                        <Clock size={14} /> {member.lastActive}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors" title="Edit Role">
                                                <Settings size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-600 transition-colors" title="Remove Member">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
