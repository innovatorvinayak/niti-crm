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
import { useState } from "react";

type WorkflowNode = {
    id: string;
    type: "trigger" | "action" | "condition" | "delay";
    label: string;
    description: string;
    icon: any; // Lucide Icon
    status: "active" | "inactive" | "draft";
    x: number;
    y: number;
};

const initialNodes: WorkflowNode[] = [
    { id: "1", type: "trigger", label: "New Lead Created", description: "When a new lead is added to CRM", icon: Zap, status: "active", x: 50, y: 50 },
    { id: "2", type: "condition", label: "Check Lead Score", description: "If score > 50", icon: GitBranch, status: "active", x: 50, y: 180 },
    { id: "3", type: "action", label: "Send Welcome Email", description: "Template: 'Intro Sequence 1'", icon: Mail, status: "active", x: -100, y: 320 },
    { id: "4", type: "action", label: "Assign to Sales Rep", description: "Round Robin Assignment", icon: CheckCircle2, status: "active", x: 200, y: 320 },
    { id: "5", type: "delay", label: "Wait 2 Days", description: "Pause workflow for 48 hours", icon: Clock, status: "active", x: -100, y: 450 },
    { id: "6", type: "action", label: "Send Follow-up SMS", description: "Template: 'Checking in'", icon: MessageSquare, status: "draft", x: -100, y: 580 },
];

export default function AutomationsPage() {
    const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
    const [selectedWorkflow, setSelectedWorkflow] = useState("Lead Nurturing Sequence");

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
                            <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-600 border border-green-500/20 rounded-full font-mono uppercase tracking-wider">Active</span>
                        </h1>
                        <p className="text-xs text-muted-foreground">Last run: 12 minutes ago • 452 Enrollments</p>
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
                    {/* Connecting Lines */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
                            </marker>
                        </defs>
                        {/* Example static connections matching the node coords roughly */}
                        {/* Node 1 -> 2 */}
                        <path d="M 500 120 L 500 200" stroke="#cbd5e1" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                        {/* Node 2 -> 3 (Left Branch) */}
                        <path d="M 450 250 C 450 300, 350 300, 350 340" stroke="#cbd5e1" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                        {/* Node 2 -> 4 (Right Branch) */}
                        <path d="M 550 250 C 550 300, 650 300, 650 340" stroke="#cbd5e1" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                        {/* Node 3 -> 5 */}
                        <path d="M 350 400 L 350 470" stroke="#cbd5e1" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                        {/* Node 5 -> 6 */}
                        <path d="M 350 530 L 350 600" stroke="#cbd5e1" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                    </svg>

                    <div className="flex flex-col items-center gap-12 z-10 w-full max-w-4xl">

                        {/* Trigger Node */}
                        <WorkflowNodeCard node={nodes[0]} />

                        {/* Logic Split */}
                        <WorkflowNodeCard node={nodes[1]} color="border-yellow-500/30 bg-yellow-500/5" iconColor="text-yellow-400" />

                        {/* Parallel Actions Container */}
                        <div className="flex gap-32 w-full justify-center">
                            <div className="flex flex-col gap-12 items-center">
                                <WorkflowNodeCard node={nodes[2]} />
                                <WorkflowNodeCard node={nodes[4]} type="delay" />
                                <WorkflowNodeCard node={nodes[5]} />
                            </div>
                            <div className="flex flex-col gap-12 items-center">
                                <WorkflowNodeCard node={nodes[3]} />
                                {/* End of branch */}
                                <div className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground">
                                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                    </div>
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
