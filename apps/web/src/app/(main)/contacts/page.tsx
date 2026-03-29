"use client";

import {
    Search,
    Plus,
    Mail,
    Calendar,
    Users,
    RefreshCw,
    Loader2,
    Phone,
    Building,
    LayoutGrid,
    LayoutList,
    Filter,
    CheckCircle2,
    Clock,
    Target,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { isApiError } from "@/lib/api";
import { clearAuthSession } from "@/lib/auth-storage";
import {
    CONTACT_STATUSES,
    getContactDisplayName,
    normalizeContactStatus,
    type Contact,
} from "@/lib/contacts";
import { useLeads } from "@/lib/LeadContext";
import { useUser } from "@/lib/UserContext";

type CreateContactState = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    status: string;
};

type ViewMode = "all" | "team" | "my";

const statusClassMap: Record<string, string> = {
    Lead: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Prospect: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Customer: "bg-green-500/10 text-green-600 border-green-500/20",
    Inactive: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
};

function toContactInitials(name: string): string {
    const cleaned = name.trim();
    if (!cleaned) return "?";
    const segments = cleaned.split(/\s+/).filter(Boolean);
    if (segments.length === 1) return segments[0].slice(0, 2).toUpperCase();
    return `${segments[0][0]}${segments[1][0]}`.toUpperCase();
}

function formatRelativeDate(isoDate: string): string {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function getStatusClass(status: string): string {
    return statusClassMap[status] ?? "bg-muted text-muted-foreground border-border";
}

export default function ContactsPage() {
    const router = useRouter();
    const { contacts, loading, refreshing, error, loadContacts, addContact } = useLeads();
    const { user } = useUser();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>("all");
    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [createContactState, setCreateContactState] = useState<CreateContactState>({
        firstName: "", lastName: "", email: "", phone: "", company: "", status: "Lead",
    });

    const filteredContacts = useMemo(() => {
        let base = contacts;
        
        // Role-based filtering (mocked logic for team/my)
        if (viewMode === "my" && user) {
            // Ideally backend would filter, but here we can simulate if owner_id exists
            // base = base.filter(c => c.owner_id === user.id); 
        } else if (viewMode === "team" && user?.team_id) {
            // base = base.filter(c => c.team_id === user.team_id);
        }

        const query = searchTerm.trim().toLowerCase();
        if (!query) return base;

        return base.filter((contact) => {
            const displayName = getContactDisplayName(contact);
            const status = normalizeContactStatus(contact.status);
            return [displayName, contact.email ?? "", contact.phone ?? "", contact.company ?? "", status]
                .join(" ")
                .toLowerCase()
                .includes(query);
        });
    }, [contacts, searchTerm, viewMode, user]);

    const handleCreateContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsCreating(true);
        setSubmitError("");
        try {
            await addContact({
                firstName: createContactState.firstName,
                lastName: createContactState.lastName,
                email: createContactState.email,
                phone: createContactState.phone,
                company: createContactState.company,
                status: createContactState.status,
            });
            setCreateContactState({ firstName: "", lastName: "", email: "", phone: "", company: "", status: "Lead" });
            setIsComposerOpen(false);
        } catch (err) {
            if (isApiError(err) && [401, 403].includes(err.status)) {
                clearAuthSession();
                router.replace("/login");
                return;
            }
            setSubmitError(err instanceof Error ? err.message : "Unable to create contact.");
        } finally {
            setIsCreating(false);
        }
    };

    const stats = useMemo(() => {
        const total = contacts.length;
        const leads = contacts.filter(c => normalizeContactStatus(c.status) === "Lead").length;
        const customers = contacts.filter(c => normalizeContactStatus(c.status) === "Customer").length;
        const conversion = total > 0 ? Math.round((customers / total) * 100) : 0;
        return { total, leads, customers, conversion };
    }, [contacts]);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex gap-2 items-center">
                        <Users className="text-primary" /> Contacts & Leads
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage all your pipeline entities and synced records.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative w-full sm:min-w-[260px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="search"
                            placeholder="Search records..."
                            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all font-sans"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => void loadContacts(true)}
                        className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-foreground text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                        <RefreshCw size={16} className={refreshing.contacts ? "animate-spin" : ""} /> Refresh
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsComposerOpen((o) => !o)}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus size={16} /> Add New
                    </button>
                </div>
            </div>

            {/* View Mode Switching + Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1 bg-card border border-border rounded-xl p-1 flex gap-1">
                    {(["all", "team", "my"] as ViewMode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setViewMode(m)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${viewMode === m ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted"}`}
                        >
                            {m} Leads
                        </button>
                    ))}
                </div>
                
                <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center"><LayoutGrid size={14}/></div>
                        <div><p className="text-[10px] uppercase font-bold text-muted-foreground">Total</p><p className="text-sm font-bold">{stats.total}</p></div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center"><Clock size={14}/></div>
                        <div><p className="text-[10px] uppercase font-bold text-muted-foreground">New Leads</p><p className="text-sm font-bold">{stats.leads}</p></div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center"><CheckCircle2 size={14}/></div>
                        <div><p className="text-[10px] uppercase font-bold text-muted-foreground">Customers</p><p className="text-sm font-bold">{stats.customers}</p></div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Target size={14}/></div>
                        <div><p className="text-[10px] uppercase font-bold text-muted-foreground">Conversion</p><p className="text-sm font-bold">{stats.conversion}%</p></div>
                    </div>
                </div>
            </div>

            {/* Create Form */}
            <AnimatePresence>
                {isComposerOpen && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleCreateContact}
                        className="bg-card border border-border rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col gap-1.5 lg:col-span-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">First Name</label>
                            <input
                                type="text"
                                value={createContactState.firstName}
                                onChange={(e) => setCreateContactState(s => ({ ...s, firstName: e.target.value }))}
                                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 lg:col-span-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Last Name</label>
                            <input
                                type="text"
                                value={createContactState.lastName}
                                onChange={(e) => setCreateContactState(s => ({ ...s, lastName: e.target.value }))}
                                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 lg:col-span-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Work Email</label>
                            <input
                                type="email"
                                value={createContactState.email}
                                onChange={(e) => setCreateContactState(s => ({ ...s, email: e.target.value }))}
                                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 lg:col-span-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Phone Number</label>
                            <input
                                type="tel"
                                value={createContactState.phone}
                                onChange={(e) => setCreateContactState(s => ({ ...s, phone: e.target.value }))}
                                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 lg:col-span-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Company</label>
                            <input
                                type="text"
                                value={createContactState.company}
                                onChange={(e) => setCreateContactState(s => ({ ...s, company: e.target.value }))}
                                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 lg:col-span-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Lead Type</label>
                            <select
                                value={createContactState.status}
                                onChange={(e) => setCreateContactState(s => ({ ...s, status: e.target.value }))}
                                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none h-full"
                            >
                                {CONTACT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="md:col-span-2 lg:col-span-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="bg-primary text-primary-foreground rounded-lg px-6 py-2 text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex gap-2 items-center"
                            >
                                {isCreating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                Save Record
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Error Message */}
            {(error || submitError) && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex gap-3 items-center">
                    <Filter size={16} /> {error || submitError}
                </div>
            )}

            {/* Main Table Section */}
            <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                {loading.contacts ? (
                    <div className="p-20 text-center text-muted-foreground flex flex-col items-center gap-4">
                        <Loader2 size={32} className="animate-spin text-primary/40" />
                        <p className="font-medium">Syncing with CRM Database...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="border-b border-border text-muted-foreground text-[10px] uppercase tracking-widest bg-muted/30">
                                    <th className="p-5 font-bold">Identity & Name</th>
                                    <th className="p-5 font-bold">Contact Info</th>
                                    <th className="p-5 font-bold">Organization</th>
                                    <th className="p-5 font-bold">Lifecycle Status</th>
                                    <th className="p-5 font-bold">Acquisition Date</th>
                                    <th className="p-5 text-right font-bold pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map((contact, index) => {
                                    const name = getContactDisplayName(contact);
                                    const status = normalizeContactStatus(contact.status);
                                    return (
                                        <motion.tr
                                            key={contact.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.02 }}
                                            className="border-b border-border hover:bg-muted/30 transition-all group"
                                        >
                                            <td className="p-5">
                                                <div className="flex items-center gap-4 text-foreground">
                                                    <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center font-bold text-muted-foreground text-xs group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all font-sans">
                                                        {toContactInitials(name)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <Link href={`/contacts/${contact.id}`} className="font-bold hover:text-primary transition-colors block truncate">{name}</Link>
                                                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{contact.id.slice(0, 12)}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium flex items-center gap-2 decoration-primary/20 hover:underline cursor-pointer"><Mail size={12} className="text-muted-foreground" /> {contact.email || "—"}</span>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-2"><Phone size={12} className="text-muted-foreground" /> {contact.phone || "—"}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2 text-sm font-medium">
                                                    <Building size={14} className="text-muted-foreground" />
                                                    {contact.company || <span className="text-muted-foreground italic">Independent</span>}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusClass(status)}`}>
                                                    {status}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                                    <Calendar size={14} /> {formatRelativeDate(contact.created_at)}
                                                </div>
                                            </td>
                                            <td className="p-5 text-right pr-8">
                                                <Link href={`/contacts/${contact.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-all">
                                                    Profile <Briefcase size={12}/>
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {filteredContacts.length === 0 && (
                            <div className="p-20 text-center text-muted-foreground flex flex-col items-center gap-3">
                                <Search size={40} className="text-muted-foreground/20" />
                                <p className="font-medium">{searchTerm ? `No results for "${searchTerm}"` : "Database is empty."}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
