"use client";

import {
    Mail,
    Calendar,
    ArrowLeft,
    Phone,
    Building,
    BadgeCheck,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { isApiError } from "@/lib/api";
import { clearAuthSession, getStoredToken } from "@/lib/auth-storage";
import { fetchContacts, getContactDisplayName, normalizeContactStatus, type Contact } from "@/lib/contacts";

function getDisplayInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
        return "?";
    }
    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

export default function ContactProfilePage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadContact = async () => {
            const token = getStoredToken();
            if (!token) {
                clearAuthSession();
                router.replace("/login");
                return;
            }

            try {
                const contacts = await fetchContacts(token);
                const selectedContact = contacts.find((item) => item.id === id) ?? null;
                setContact(selectedContact);
                if (!selectedContact) {
                    setError("Contact not found in your organization.");
                }
            } catch (requestError) {
                if (isApiError(requestError) && [401, 403].includes(requestError.status)) {
                    clearAuthSession();
                    router.replace("/login");
                    return;
                }

                setError(requestError instanceof Error ? requestError.message : "Unable to load contact profile.");
            } finally {
                setLoading(false);
            }
        };

        void loadContact();
    }, [id, router]);

    const statusLabel = useMemo(() => {
        if (!contact) {
            return "Lead";
        }

        return normalizeContactStatus(contact.status);
    }, [contact]);

    const displayName = useMemo(() => {
        if (!contact) {
            return "Unknown Contact";
        }

        return getContactDisplayName(contact);
    }, [contact]);

    if (loading) {
        return (
            <div className="min-h-[40vh] grid place-items-center text-muted-foreground gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading contact profile...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto text-foreground font-sans space-y-6">
            <Link href="/contacts" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Contacts
            </Link>

            {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
                    {error}
                </div>
            )}

            {contact && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.aside
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-2xl p-6 lg:col-span-1"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-2xl font-bold">
                                {getDisplayInitials(displayName)}
                            </div>

                            <div>
                                <h1 className="text-xl font-semibold text-foreground">{displayName}</h1>
                                <p className="text-sm text-muted-foreground mt-1">Contact profile</p>
                            </div>

                            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border border-primary/20 bg-primary/10 text-primary">
                                <BadgeCheck size={12} />
                                {statusLabel}
                            </span>
                        </div>

                        <div className="mt-6 space-y-4 text-sm">
                            <p className="inline-flex items-center gap-2 text-muted-foreground">
                                <Mail size={14} />
                                {contact.email ?? "No email saved"}
                            </p>
                            <p className="inline-flex items-center gap-2 text-muted-foreground">
                                <Phone size={14} />
                                {contact.phone ?? "No phone saved"}
                            </p>
                            <p className="inline-flex items-center gap-2 text-muted-foreground">
                                <Building size={14} />
                                {contact.company ?? "No company saved"}
                            </p>
                        </div>
                    </motion.aside>

                    <motion.section
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="lg:col-span-2 bg-card border border-border rounded-2xl p-6"
                    >
                        <h2 className="text-lg font-semibold">Timeline</h2>
                        <p className="text-sm text-muted-foreground mt-1">This record is connected to live backend contact data.</p>

                        <div className="mt-6 space-y-4">
                            <div className="rounded-xl border border-border p-4">
                                <p className="text-sm font-medium text-foreground">Contact created</p>
                                <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                                    <Calendar size={12} />
                                    {formatDate(contact.created_at)}
                                </p>
                            </div>

                            <div className="rounded-xl border border-border p-4">
                                <p className="text-sm font-medium text-foreground">Most recent update</p>
                                <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                                    <Calendar size={12} />
                                    {contact.updated_at ? formatDate(contact.updated_at) : "No updates yet"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-border p-4">
                                <p className="text-sm font-medium text-foreground">Current status</p>
                                <p className="text-xs text-muted-foreground mt-1">{statusLabel}</p>
                            </div>
                        </div>
                    </motion.section>
                </div>
            )}
        </div>
    );
}
