"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { fetchLeads, createLead, type Lead, type CreateLeadInput } from "@/lib/leads";
import { fetchContacts, createContact, type Contact, type CreateContactInput } from "@/lib/contacts";
import { fetchPipelineStages, type PipelineStageSummary } from "@/lib/pipeline";
import { getStoredToken } from "@/lib/auth-storage";
import { useUser } from "./UserContext";

type LoadingState = {
    leads: boolean;
    contacts: boolean;
    pipeline: boolean;
};

type LeadContextType = {
    leads: Lead[];
    contacts: Contact[];
    pipeline: PipelineStageSummary[];
    loading: LoadingState;
    refreshing: LoadingState;
    error: string;
    loadLeads: (isRefresh?: boolean) => Promise<void>;
    loadContacts: (isRefresh?: boolean) => Promise<void>;
    loadPipeline: (isRefresh?: boolean) => Promise<void>;
    addLead: (payload: CreateLeadInput) => Promise<Lead>;
    addContact: (payload: CreateContactInput) => Promise<Contact>;
};

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useUser();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [pipeline, setPipeline] = useState<PipelineStageSummary[]>([]);
    const [loading, setLoading] = useState<LoadingState>({ leads: false, contacts: false, pipeline: false });
    const [refreshing, setRefreshing] = useState<LoadingState>({ leads: false, contacts: false, pipeline: false });
    const [error, setError] = useState("");

    const loadLeads = useCallback(async (isRefresh = false) => {
        const token = getStoredToken();
        if (!token) return;

        if (isRefresh) setRefreshing((prev) => ({ ...prev, leads: true }));
        else setLoading((prev) => ({ ...prev, leads: true }));

        try {
            const data = await fetchLeads(token);
            setLeads(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load leads.");
        } finally {
            setLoading((prev) => ({ ...prev, leads: false }));
            setRefreshing((prev) => ({ ...prev, leads: false }));
        }
    }, []);

    const loadContacts = useCallback(async (isRefresh = false) => {
        const token = getStoredToken();
        if (!token) return;

        if (isRefresh) setRefreshing((prev) => ({ ...prev, contacts: true }));
        else setLoading((prev) => ({ ...prev, contacts: true }));

        try {
            const data = await fetchContacts(token);
            setContacts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load contacts.");
        } finally {
            setLoading((prev) => ({ ...prev, contacts: false }));
            setRefreshing((prev) => ({ ...prev, contacts: false }));
        }
    }, []);

    const loadPipeline = useCallback(async (isRefresh = false) => {
        const token = getStoredToken();
        if (!token) return;

        if (isRefresh) setRefreshing((prev) => ({ ...prev, pipeline: true }));
        else setLoading((prev) => ({ ...prev, pipeline: true }));

        try {
            const data = await fetchPipelineStages(token);
            setPipeline(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load pipeline.");
        } finally {
            setLoading((prev) => ({ ...prev, pipeline: false }));
            setRefreshing((prev) => ({ ...prev, pipeline: false }));
        }
    }, []);

    const addLead = async (payload: CreateLeadInput) => {
        const token = getStoredToken();
        if (!token) throw new Error("No auth token");
        const newLead = await createLead(token, payload);
        setLeads((prev) => [newLead, ...prev]);
        return newLead;
    };

    const addContact = async (payload: CreateContactInput) => {
        const token = getStoredToken();
        if (!token) throw new Error("No auth token");
        const newContact = await createContact(token, payload);
        setContacts((prev) => [newContact, ...prev]);
        return newContact;
    };

    useEffect(() => {
        if (isAuthenticated) {
            void loadLeads();
            void loadContacts();
            void loadPipeline();
        }
    }, [isAuthenticated, loadLeads, loadContacts, loadPipeline]);

    return (
        <LeadContext.Provider
            value={{
                leads,
                contacts,
                pipeline,
                loading,
                refreshing,
                error,
                loadLeads,
                loadContacts,
                loadPipeline,
                addLead,
                addContact,
            }}
        >
            {children}
        </LeadContext.Provider>
    );
}

export function useLeads() {
    const context = useContext(LeadContext);
    if (context === undefined) {
        throw new Error("useLeads must be used within a LeadProvider");
    }
    return context;
}
