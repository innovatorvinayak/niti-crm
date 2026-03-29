"use client";

import { motion } from "framer-motion";
import {
    Zap,
    Plus,
    GitBranch,
    Mail,
    MessageSquare,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Play,
    Pause,
    MoreHorizontal
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

type WorkflowNode = {
    id: string;
    type: "trigger" | "action" | "condition" | "delay";
    label: string;
    description: string;
    icon: LucideIcon;
    status: "active" | "inactive" | "draft";
    x: number;
    y: number;
};

const initialNodes: WorkflowNode[] = [];

export default function AutomationsPage() {
    const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
    const [selectedWorkflow, setSelectedWorkflow] = useState("Untilted Workflow");

    return (
        <div className="h-full flex flex-col font-sans text-foreground bg-background overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 border border-purple-500/20">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold flex items-center gap-2">
                            {selectedWorkflow}
                            <span className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded-full font-mono uppercase tracking-wider">Draft</span>
                        </h1>
                        <p className="text-xs text-muted-foreground">Ready to configure automation</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors border border-border flex items-center gap-2">
                        <Pause size={14} /> Pause
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                        <Plus size={16} /> Add Step
                    </button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative bg-muted/20 overflow-auto texture-dots">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                <div className="min-h-full min-w-full p-20 flex flex-col items-center relative">
                    {nodes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[500px] text-center max-w-md mx-auto">
                            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6 border border-border">
                                <Plus size={32} className="text-muted-foreground/30" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Build your first automation</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Connect triggers, actions, and logic to automate your sales and marketing workflows.
                            </p>
                            <button className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Create New Workflow
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-12 z-10 w-full max-w-4xl">
                            {/* SVG connections and nodes would go here if nodes exist */}
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Palette */}
            <div className="absolute top-20 left-6 w-64 bg-card/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-2xl">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Available Triggers</h3>
                <div className="space-y-2">
                    {["Form Submitted", "Page Visited", "Deal Stage Changed", "Tag Added"].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-grab active:cursor-grabbing transition-colors group">
                            <div className="w-6 h-6 rounded flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                <Zap size={12} />
                            </div>
                            <span className="text-sm text-foreground group-hover:text-primary">{t}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function WorkflowNodeCard({ node, color = "border-border bg-card", iconColor = "text-primary", type = "normal" }: { node: WorkflowNode, color?: string, iconColor?: string, type?: "normal" | "delay" }) {
    if (type === "delay") {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-dashed border-border bg-muted/50 text-muted-foreground text-sm font-mono cursor-pointer hover:border-primary/50 transition-all"
            >
                <Clock size={14} />
                {node.label}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
            className={`w-72 p-4 rounded-xl border ${color} relative group cursor-pointer hover:border-primary/50 transition-all`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg bg-muted ${iconColor}`}>
                    <node.icon size={18} />
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MoreHorizontal size={16} />
                </button>
            </div>
            <h4 className="font-bold text-foreground text-sm">{node.label}</h4>
            <p className="text-xs text-muted-foreground mt-1">{node.description}</p>

            <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${node.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
        </motion.div>
    );
}
