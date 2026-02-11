"use client";

import {
    Mail,
    Phone,
    Building,
    MapPin,
    Calendar,
    Clock,
    FileText,
    MoreHorizontal,
    ArrowLeft,
    Users,
    Plus
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";

export default function ContactProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="max-w-6xl mx-auto text-white font-sans">
            <Link href="/contacts" className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary mb-8 transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Contacts
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar: Profile Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="rounded-xl border border-white/10 bg-[#0a0a0a] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/10 to-transparent group-hover:opacity-75 transition-opacity" />

                        <div className="relative z-10 p-6 pt-12 flex flex-col items-center text-center">
                            <div className="w-28 h-28 rounded-full bg-[#1a1a1a] border-4 border-[#0a0a0a] ring-2 ring-primary/20 flex items-center justify-center text-4xl font-bold text-primary mb-4 shadow-xl">
                                A
                            </div>
                            <h2 className="text-2xl font-bold text-white">Alice Freeman</h2>
                            <p className="text-zinc-500 text-sm mb-6 font-medium">VP of Engineering at TechFlow</p>

                            <div className="flex gap-3 w-full">
                                <button className="flex-1 py-2 bg-primary text-black rounded-lg font-bold hover:bg-white transition-colors text-sm shadow-lg shadow-primary/20">Message</button>
                                <button className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-sm">Edit</button>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/5 space-y-4 bg-zinc-900/10">
                            <div className="flex items-center gap-3 text-sm text-zinc-300">
                                <Mail size={16} className="text-zinc-600" /> alice@techflow.io
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-300">
                                <Phone size={16} className="text-zinc-600" /> +1 555-0123
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-300">
                                <Building size={16} className="text-zinc-600" /> TechFlow Inc.
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-300">
                                <MapPin size={16} className="text-zinc-600" /> San Francisco, CA
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6">
                        <h3 className="font-bold text-xs text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Users size={14} /> Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-semibold">Warm Lead</span>
                            <span className="bg-zinc-800 text-zinc-300 border border-white/5 px-3 py-1 rounded-full text-xs font-semibold">SaaS</span>
                            <button className="text-zinc-500 hover:text-white text-xs px-2 py-1 flex items-center gap-1 transition-colors">
                                <Plus size={12} /> Add
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content: Activity & Notes */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Log Call", icon: Phone, color: "text-green-400", bg: "bg-green-400/10" },
                            { label: "Send Email", icon: Mail, color: "text-blue-400", bg: "bg-blue-400/10" },
                            { label: "Add Note", icon: FileText, color: "text-yellow-400", bg: "bg-yellow-400/10" },
                            { label: "Meeting", icon: Calendar, color: "text-purple-400", bg: "bg-purple-400/10" },
                        ].map((action, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ y: -2 }}
                                className="p-4 bg-[#0a0a0a] border border-white/10 hover:border-primary/30 rounded-xl flex flex-col items-center gap-3 transition-colors group"
                            >
                                <div className={`p-2 rounded-lg ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                                    <action.icon size={20} />
                                </div>
                                <span className="text-sm font-medium text-zinc-300 group-hover:text-white text-center">{action.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-lg text-white">Activity Timeline</h3>
                            <button className="text-zinc-600 hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
                        </div>

                        <div className="relative space-y-8 pl-8 border-l border-zinc-800 ml-4">
                            {[
                                {
                                    type: "Email", icon: Mail, title: "Email Sent: Follow-up on Proposal", time: "2 hours ago",
                                    content: "Hey Alice, just checking in on the proposal we sent last week...",
                                    color: "text-blue-400", bg: "bg-blue-900/20", border: "border-blue-500/30"
                                },
                                {
                                    type: "Call", icon: Phone, title: "Call with Alice", time: "Yesterday",
                                    content: "Discussed custom integration requirements. She seemed positive about the pricing.",
                                    meta: "15m duration",
                                    color: "text-green-400", bg: "bg-green-900/20", border: "border-green-500/30"
                                },
                                {
                                    type: "Meeting", icon: Calendar, title: "Meeting Scheduled", time: "3 days ago",
                                    content: "Product Demo with Engineering Team",
                                    color: "text-purple-400", bg: "bg-purple-900/20", border: "border-purple-500/30"
                                },
                            ].map((item, i) => (
                                <div key={i} className="relative group">
                                    <div className={`absolute -left-[41px] bg-[#0a0a0a] p-1.5 rounded-full border border-zinc-800 group-hover:border-primary/50 transition-colors`}>
                                        <div className={`w-6 h-6 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                                            <item.icon size={12} />
                                        </div>
                                    </div>
                                    <div className="bg-zinc-900/30 p-5 rounded-xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-sm text-zinc-200">{item.title}</h4>
                                            <span className="text-xs text-zinc-500 font-mono">{item.time}</span>
                                        </div>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{item.content}</p>
                                        {item.meta && (
                                            <div className="mt-3 flex gap-2">
                                                <span className="text-xs bg-zinc-800 px-2 py-1 rounded border border-white/5 flex items-center gap-1 text-zinc-400">
                                                    <Clock size={10} /> {item.meta}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
