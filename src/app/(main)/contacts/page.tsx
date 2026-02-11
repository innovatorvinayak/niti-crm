"use client";

import {
    Search,
    Filter,
    MoreHorizontal,
    Plus,
    Mail,
    Phone,
    Calendar,
    Users
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const contacts = [
        { id: 1, name: "Alice Freeman", email: "alice@techflow.io", phone: "+1 555-0123", company: "TechFlow", status: "Lead", lastActive: "2h ago" },
        { id: 2, name: "Bob Smith", email: "bob@designco.com", phone: "+1 555-0124", company: "DesignCo", status: "Customer", lastActive: "1d ago" },
        { id: 3, name: "Charlie Davis", email: "charlie@buildit.net", phone: "+1 555-0125", company: "BuildIt", status: "Prospect", lastActive: "3d ago" },
        { id: 4, name: "Diana Prince", email: "diana@amazonia.com", phone: "+1 555-0126", company: "Amazonia", status: "Lead", lastActive: "5m ago" },
        { id: 5, name: "Evan Wright", email: "evan@write.io", phone: "+1 555-0127", company: "WriteIO", status: "Churned", lastActive: "1w ago" },
    ];

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <h1 className="text-2xl font-bold text-foreground flex gap-2 items-center">
                    <Users className="text-primary" /> Contacts
                </h1>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-foreground text-sm font-medium flex items-center gap-2 transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
                        <Plus size={16} /> Add
                    </button>
                </div>
            </div>

            {/* Contacts List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border rounded-xl overflow-hidden bg-card"
            >
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider bg-muted/50">
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Company</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Last Activity</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((contact, i) => (
                            <motion.tr
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={contact.id}
                                className="border-b border-border hover:bg-muted/50 transition-colors group"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all">
                                            {contact.name.charAt(0)}
                                        </div>
                                        <div>
                                            <Link href={`/contacts/${contact.id}`} className="font-medium text-foreground hover:text-primary transition-colors block">
                                                {contact.name}
                                            </Link>
                                            <div className="flex gap-2 text-xs text-muted-foreground mt-0.5">
                                                <span className="flex items-center gap-1 hover:text-foreground"><Mail size={10} /> {contact.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-foreground/80 font-medium text-sm">{contact.company}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${contact.status === 'Customer' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                                        contact.status === 'Lead' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                                            'bg-muted text-muted-foreground border-border'
                                        }`}>
                                        {contact.status}
                                    </span>
                                </td>
                                <td className="p-4 text-muted-foreground text-sm">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {contact.lastActive}
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">
                        No contacts found matching "{searchTerm}"
                    </div>
                )}
            </motion.div>
        </div>
    );
}
