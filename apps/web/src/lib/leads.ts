import { apiRequest } from "@/lib/api";

export const LEAD_STAGES = ["New", "Contacted", "Qualified", "Proposal", "Won"] as const;

export type LeadStage = (typeof LEAD_STAGES)[number];

export type Lead = {
    id: string;
    organization_id: string;
    name: string;
    email: string | null;
    status: string;
    created_at: string;
    updated_at: string | null;
};

export type CreateLeadInput = {
    name: string;
    email?: string;
    status?: LeadStage;
};

export function normalizeLeadStage(status: string): LeadStage {
    const matched = LEAD_STAGES.find((stage) => stage.toLowerCase() === status.toLowerCase());
    return matched ?? "New";
}

export async function fetchLeads(token: string): Promise<Lead[]> {
    return apiRequest<Lead[]>("/crm/leads/", {
        method: "GET",
        token,
    });
}

export async function createLead(token: string, payload: CreateLeadInput): Promise<Lead> {
    return apiRequest<Lead>("/crm/leads/", {
        method: "POST",
        token,
        body: JSON.stringify({
            name: payload.name,
            email: payload.email?.trim() || undefined,
            status: payload.status ?? "New",
        }),
    });
}

