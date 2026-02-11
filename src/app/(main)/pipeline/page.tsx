"use client";

import {
    MoreHorizontal,
    Plus,
    GripHorizontal,
    KanbanSquare
} from "lucide-react";
import { DragEvent, useState } from "react";
import { motion } from "framer-motion";

type Deal = {
    id: number;
    title: string;
    amount: string;
    company: string;
    stage: string;
    contact: string;
};

const stages = ["New", "Contacted", "Qualified", "Proposal", "Won"];

export default function PipelinePage() {
    const [deals, setDeals] = useState<Deal[]>([
        { id: 1, title: "Enterprise License", amount: "$12,000", company: "TechFlow", stage: "New", contact: "Alice Freeman" },
        { id: 2, title: "Consulting Project", amount: "$4,500", company: "DesignCo", stage: "Contacted", contact: "Bob Smith" },
        { id: 3, title: "Website Redesign", amount: "$28,000", company: "BuildIt", stage: "Proposal", contact: "Charlie Davis" },
        { id: 4, title: "App Development", amount: "$150,000", company: "Amazonia", stage: "Won", contact: "Diana Prince" },
        { id: 5, title: "Maintenance Contract", amount: "$2,000", company: "WriteIO", stage: "New", contact: "Evan Wright" },
    ]);

    const onDragStart = (e: DragEvent, id: number) => {
        e.dataTransfer.setData("dealId", id.toString());
    };

    const onDrop = (e: DragEvent, stage: string) => {
        e.preventDefault();
        const dealId = e.dataTransfer.getData("dealId");
        if (dealId) {
            const id = parseInt(dealId);
            setDeals(deals.map(deal => deal.id === id ? { ...deal, stage } : deal));
        }
    };

    const onDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className="h-full flex flex-col font-sans text-white">
            <div className="flex justify-between items-center mb-6 px-1">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <KanbanSquare className="text-primary" /> Pipeline
                </h1>
                <button className="px-4 py-2 bg-primary hover:bg-white text-black rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
                    <Plus size={16} /> New Deal
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 h-full min-w-full">
                {stages.map((stage) => (
                    <div
                        key={stage}
                        className="flex-shrink-0 w-80 bg-[#0a0a0a] rounded-xl border border-white/5 flex flex-col h-full"
                        onDrop={(e) => onDrop(e, stage)}
                        onDragOver={onDragOver}
                    >
                        <div className="p-4 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-10 rounded-t-xl">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">{stage}</h3>
                            <span className="text-xs bg-zinc-900 border border-white/5 px-2 py-1 rounded-full text-zinc-500 font-mono">
                                {deals.filter(d => d.stage === stage).length}
                            </span>
                        </div>

                        <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                            {deals.filter(d => d.stage === stage).map(deal => (
                                <div
                                    key={deal.id}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, deal.id)}
                                    className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 rounded-lg border border-white/5 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group shadow-sm"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{deal.title}</h4>
                                        <button className="text-zinc-600 hover:text-white transition-colors">
                                            <MoreHorizontal size={14} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-zinc-500 mb-3">{deal.company}</p>

                                    <div className="flex justify-between items-center text-xs pt-3 border-t border-white/5">
                                        <span className="font-mono text-green-400 font-semibold bg-green-900/10 px-1.5 py-0.5 rounded border border-green-500/10">{deal.amount}</span>
                                        <div className="flex items-center gap-1">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-[10px] font-bold">
                                                {deal.contact.charAt(0)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full py-3 text-xs text-zinc-600 hover:text-primary hover:bg-white/5 rounded-lg border border-dashed border-zinc-800 hover:border-primary/30 transition-all flex items-center justify-center gap-2 group">
                                <Plus size={12} className="group-hover:rotate-90 transition-transform" /> Add Deal
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
