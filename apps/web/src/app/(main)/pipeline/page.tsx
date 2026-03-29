"use client";

import {
    KanbanSquare,
    Loader2,
    Plus,
    RefreshCw,
    Search,
    Users,
} from "lucide-react";
import { type DragEvent, useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isApiError } from "@/lib/api";
import { clearAuthSession, getStoredToken } from "@/lib/auth-storage";
import {
    createPipelineDeal,
    normalizePipelineStage,
    PIPELINE_DEFAULT_STAGES,
    updatePipelineDealStage,
    type Deal,
    type PipelineStageSummary,
} from "@/lib/pipeline";
import { useLeads } from "@/lib/LeadContext";

type DealComposerState = {
    title: string;
    amount: string;
    stage: string;
};

type StageDealsMap = Record<string, Deal[]>;

const stageStyleMap: Record<string, string> = {
    New: "border-blue-500/30 bg-blue-500/5",
    Contacted: "border-amber-500/30 bg-amber-500/5",
    Qualified: "border-purple-500/30 bg-purple-500/5",
    Proposal: "border-indigo-500/30 bg-indigo-500/5",
    Won: "border-green-500/30 bg-green-500/5",
    Lost: "border-rose-500/30 bg-rose-500/5",
};

function getStageStyle(stage: string): string {
    const normalizedStage = normalizePipelineStage(stage);
    return stageStyleMap[normalizedStage] ?? "border-slate-500/30 bg-slate-500/5";
}

function getOrderedStages(stageNames: string[]): string[] {
    const normalizedStages = Array.from(new Set(stageNames.map((stage) => normalizePipelineStage(stage))));
    const extraStages = normalizedStages
        .filter((stage) => !PIPELINE_DEFAULT_STAGES.includes(stage as (typeof PIPELINE_DEFAULT_STAGES)[number]))
        .sort((firstStage, secondStage) => firstStage.localeCompare(secondStage));

    return [...PIPELINE_DEFAULT_STAGES, ...extraStages];
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function formatCompactDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function formatCompactId(value: string | null): string {
    if (!value) return "Unassigned";
    return `${value.slice(0, 8)}…`;
}

export default function PipelinePage() {
    const router = useRouter();
    const { pipeline: stageSummaries, loading, refreshing, error, loadPipeline } = useLeads();
    const [searchTerm, setSearchTerm] = useState("");
    const [showComposer, setShowComposer] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [transitioningDealId, setTransitioningDealId] = useState<string | null>(null);
    const [dealComposerState, setDealComposerState] = useState<DealComposerState>({
        title: "",
        amount: "",
        stage: "New",
    });

    const stageNames = useMemo(() => {
        const sourceStages = stageSummaries.map((summary) => normalizePipelineStage(summary.stage));
        return getOrderedStages(sourceStages);
    }, [stageSummaries]);

    const groupedDeals = useMemo(() => {
        const stageDealsMap: StageDealsMap = {};
        for (const stageName of stageNames) {
            stageDealsMap[stageName] = [];
        }

        for (const summary of stageSummaries) {
            const stageName = normalizePipelineStage(summary.stage);
            const deals = summary.deals.map((deal) => ({
                ...deal,
                stage: normalizePipelineStage(deal.stage),
                amount: Number(deal.amount ?? 0),
            }));
            stageDealsMap[stageName] = [...(stageDealsMap[stageName] ?? []), ...deals];
        }

        const query = searchTerm.trim().toLowerCase();
        if (!query) return stageDealsMap;

        const filteredStageDeals: StageDealsMap = {};
        for (const stageName of stageNames) {
            filteredStageDeals[stageName] = (stageDealsMap[stageName] ?? []).filter((deal) => {
                return [
                    deal.title,
                    stageName,
                    String(deal.amount ?? ""),
                    deal.contact_id ?? "",
                    deal.owner_id ?? "",
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(query);
            });
        }

        return filteredStageDeals;
    }, [searchTerm, stageNames, stageSummaries]);

    const stageTotals = useMemo(() => {
        const totals: Record<string, number> = {};
        for (const stageName of stageNames) {
            totals[stageName] = (groupedDeals[stageName] ?? []).reduce(
                (acc, deal) => acc + Number(deal.amount || 0),
                0,
            );
        }
        return totals;
    }, [groupedDeals, stageNames]);

    const persistDealTransition = useCallback(async (dealId: string, targetStage: string) => {
        const token = getStoredToken();
        if (!token) {
            clearAuthSession();
            router.replace("/login");
            return;
        }

        const normalizedTargetStage = normalizePipelineStage(targetStage);
        setTransitioningDealId(dealId);

        try {
            await updatePipelineDealStage(token, dealId, normalizedTargetStage);
            void loadPipeline(true); // Sync global state
        } catch (requestError) {
            if (isApiError(requestError) && [401, 403].includes(requestError.status)) {
                clearAuthSession();
                router.replace("/login");
                return;
            }
        } finally {
            setTransitioningDealId(null);
        }
    }, [router, loadPipeline]);

    const handleDragStart = (event: DragEvent<HTMLElement>, dealId: string, dealStage: string) => {
        event.dataTransfer.setData("dealId", dealId);
        event.dataTransfer.setData("dealStage", normalizePipelineStage(dealStage));
        event.dataTransfer.effectAllowed = "move";
    };

    const handleDrop = (event: DragEvent<HTMLElement>, stageName: string) => {
        event.preventDefault();
        const dealId = event.dataTransfer.getData("dealId");
        const currentStage = normalizePipelineStage(event.dataTransfer.getData("dealStage"));
        const normalizedStage = normalizePipelineStage(stageName);

        if (!dealId || currentStage === normalizedStage) return;
        void persistDealTransition(dealId, normalizedStage);
    };

    const handleDragOver = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const handleCreateDeal = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = getStoredToken();
        if (!token) {
            clearAuthSession();
            router.replace("/login");
            return;
        }

        setIsSaving(true);
        try {
            await createPipelineDeal(token, {
                title: dealComposerState.title.trim(),
                amount: Number(dealComposerState.amount || 0),
                stage: dealComposerState.stage,
            });
            setDealComposerState({ title: "", amount: "", stage: "New" });
            setShowComposer(false);
            void loadPipeline(true);
        } catch (requestError) {
            if (isApiError(requestError) && [401, 403].includes(requestError.status)) {
                clearAuthSession();
                router.replace("/login");
                return;
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="h-full flex flex-col font-sans text-foreground gap-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <KanbanSquare className="text-primary" /> Pipeline
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Real-time stage board powered by backend pipeline APIs.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search deals..."
                            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => void loadPipeline(true)}
                        className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                        <RefreshCw size={16} className={refreshing.pipeline ? "animate-spin" : ""} /> Refresh
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowComposer((o) => !o)}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus size={16} /> Add Deal
                    </button>
                </div>
            </div>

            {showComposer && (
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleCreateDeal}
                    className="bg-card border border-border rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3 shadow-xl"
                >
                    <input
                        type="text"
                        value={dealComposerState.title}
                        onChange={(e) => setDealComposerState(s => ({ ...s, title: e.target.value }))}
                        placeholder="Deal title"
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none"
                        required
                    />
                    <input
                        type="number"
                        value={dealComposerState.amount}
                        onChange={(e) => setDealComposerState(s => ({ ...s, amount: e.target.value }))}
                        placeholder="Amount (USD)"
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none"
                    />
                    <select
                        value={dealComposerState.stage}
                        onChange={(e) => setDealComposerState(s => ({ ...s, stage: e.target.value }))}
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 outline-none"
                    >
                        {stageNames.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-70 shadow-lg shadow-primary/20"
                    >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                        Save Deal
                    </button>
                </motion.form>
            )}

            {loading.pipeline ? (
                <div className="flex-1 grid place-items-center text-muted-foreground p-20">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 size={32} className="animate-spin text-primary/40" />
                        <p className="font-medium uppercase tracking-widest text-[10px]">Syncing Pipeline Stages...</p>
                    </div>
                </div>
            ) : (
                <div className="flex gap-4 overflow-x-auto pb-6 flex-1 min-h-0 custom-scrollbar">
                    {stageNames.map((stage) => (
                        <section
                            key={stage}
                            className="w-80 shrink-0 rounded-2xl border border-border bg-card flex flex-col max-h-[calc(100vh-280px)] shadow-sm"
                            onDrop={(e) => handleDrop(e, stage)}
                            onDragOver={handleDragOver}
                        >
                            <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card rounded-t-2xl z-10 backdrop-blur-xl">
                                <h2 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${getStageStyle(stage).split(' ')[0].replace('border-', 'bg-').split('/')[0]}`}></div>
                                    {stage}
                                </h2>
                                <div className="text-right">
                                    <p className="text-[10px] px-2 py-0.5 bg-muted border border-border rounded-full font-bold text-muted-foreground inline-flex">
                                        {(groupedDeals[stage] ?? []).length}
                                    </p>
                                    <p className="mt-1 text-[11px] font-bold text-foreground">
                                        {formatCurrency(stageTotals[stage] ?? 0)}
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                                {(groupedDeals[stage] ?? []).map((deal, idx) => (
                                    <motion.div
                                        key={deal.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.02 }}
                                    >
                                        <article
                                            className={`rounded-xl border p-4 transition-all hover:shadow-lg cursor-grab active:cursor-grabbing group ${getStageStyle(stage)}`}
                                            draggable={transitioningDealId === null}
                                            onDragStart={(e) => handleDragStart(e, deal.id, stage)}
                                        >
                                            <div className="flex justify-between items-start gap-2">
                                                <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{deal.title}</p>
                                                <span className="w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                                                    {getInitials(deal.title)}
                                                </span>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between">
                                                <p className="text-sm font-bold text-foreground">{formatCurrency(Number(deal.amount || 0))}</p>
                                                <p className="text-[10px] text-muted-foreground font-mono">{formatCompactId(deal.owner_id)}</p>
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-border/10 space-y-1.5">
                                                <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                                                    <Users size={12} />
                                                    {deal.contact_id ? (
                                                        <Link href={`/contacts/${deal.contact_id}`} className="text-primary hover:underline font-bold">
                                                            View Contact
                                                        </Link>
                                                    ) : "Independent"}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground flex items-center gap-2 italic">
                                                    <RefreshCw size={12} /> Added {formatCompactDate(deal.created_at)}
                                                </p>
                                            </div>

                                            {transitioningDealId === deal.id && (
                                                <div className="mt-3 py-1 px-2 bg-primary/10 rounded-md flex items-center gap-2 animate-pulse">
                                                    <Loader2 size={10} className="animate-spin text-primary" />
                                                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Updating Stage...</span>
                                                </div>
                                            )}
                                        </article>
                                    </motion.div>
                                ))}

                                {(groupedDeals[stage] ?? []).length === 0 && (
                                    <div className="rounded-xl border border-dashed border-border p-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30 text-center flex flex-col items-center gap-2">
                                        <KanbanSquare size={20} className="opacity-10"/>
                                        Empty Stage
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}

