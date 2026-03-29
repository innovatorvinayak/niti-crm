import { apiRequest } from "@/lib/api";

export const PIPELINE_DEFAULT_STAGES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"] as const;

export type PipelineDefaultStage = (typeof PIPELINE_DEFAULT_STAGES)[number];

export type Deal = {
    id: string;
    organization_id: string;
    title: string;
    amount: number;
    stage: string;
    contact_id: string | null;
    owner_id: string | null;
    created_at: string;
    updated_at: string | null;
};

export type PipelineStageSummary = {
    stage: string;
    deal_count: number;
    total_amount: number;
    deals: Deal[];
};

export type CreateDealInput = {
    title: string;
    amount?: number;
    stage?: string;
    contactId?: string;
    ownerId?: string;
};

export function normalizePipelineStage(stage: string): string {
    const normalizedStage = stage.trim();
    if (!normalizedStage) {
        return "New";
    }

    const matchedStage = PIPELINE_DEFAULT_STAGES.find(
        (candidateStage) => candidateStage.toLowerCase() === normalizedStage.toLowerCase(),
    );
    return matchedStage ?? normalizedStage;
}

function normalizeDealPayload(deal: Deal): Deal {
    return {
        ...deal,
        amount: Number(deal.amount ?? 0),
        stage: normalizePipelineStage(deal.stage),
    };
}

function normalizeStageSummaryPayload(stageSummary: PipelineStageSummary): PipelineStageSummary {
    const normalizedDeals = stageSummary.deals.map(normalizeDealPayload);
    const totalAmount = normalizedDeals.reduce((aggregate, deal) => aggregate + Number(deal.amount || 0), 0);

    return {
        stage: normalizePipelineStage(stageSummary.stage),
        deal_count: normalizedDeals.length,
        total_amount: totalAmount,
        deals: normalizedDeals,
    };
}

export async function fetchPipelineStages(token: string): Promise<PipelineStageSummary[]> {
    const response = await apiRequest<PipelineStageSummary[]>("/crm/pipeline/stages/", {
        method: "GET",
        token,
    });

    return response.map(normalizeStageSummaryPayload);
}

export async function createPipelineDeal(token: string, payload: CreateDealInput): Promise<Deal> {
    const response = await apiRequest<Deal>("/crm/pipeline/deals/", {
        method: "POST",
        token,
        body: JSON.stringify({
            title: payload.title.trim(),
            amount: payload.amount ?? 0,
            stage: normalizePipelineStage(payload.stage ?? "New"),
            contact_id: payload.contactId?.trim() || undefined,
            owner_id: payload.ownerId?.trim() || undefined,
        }),
    });

    return normalizeDealPayload(response);
}

export async function updatePipelineDealStage(token: string, dealId: string, stage: string): Promise<Deal> {
    const response = await apiRequest<Deal>(`/crm/pipeline/deals/${dealId}`, {
        method: "PATCH",
        token,
        body: JSON.stringify({
            stage: normalizePipelineStage(stage),
        }),
    });

    return normalizeDealPayload(response);
}
