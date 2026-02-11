"use client";

import {
    MoreHorizontal,
    Plus,
    Bug,
    Bookmark,
    CheckSquare,
    ArrowUp,
    ArrowDown,
    Minus,
    Search,
    Filter,
    UserCircle
} from "lucide-react";
import { DragEvent, useState } from "react";

type TaskType = "Bug" | "Story" | "Task";
type Priority = "High" | "Medium" | "Low";

type Task = {
    id: string;
    summary: string;
    type: TaskType;
    priority: Priority;
    status: string;
    assignee: string; // Initials
    points?: number;
};

const statuses = ["To Do", "In Progress", "In Review", "Done"];

const initialTasks: Task[] = [
    { id: "NC-101", summary: "Fix login page alignment issues", type: "Bug", priority: "High", status: "To Do", assignee: "VF", points: 3 },
    { id: "NC-102", summary: "Implement drag and drop for pipeline", type: "Story", priority: "High", status: "Done", assignee: "AI", points: 5 },
    { id: "NC-103", summary: "Update color palette to Black/Cream", type: "Task", priority: "Medium", status: "In Progress", assignee: "VF", points: 2 },
    { id: "NC-104", summary: "Research competitive analysis", type: "Task", priority: "Low", status: "To Do", assignee: "DB", points: 1 },
    { id: "NC-105", summary: "Optimize dashboard loading speed", type: "Story", priority: "High", status: "In Review", assignee: "AI", points: 8 },
    { id: "NC-106", summary: "Add user profile settings", type: "Story", priority: "Medium", status: "To Do", assignee: "VF", points: 5 },
];

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [searchQuery, setSearchQuery] = useState("");

    const onDragStart = (e: DragEvent, id: string) => {
        e.dataTransfer.setData("taskId", id);
    };

    const onDrop = (e: DragEvent, status: string) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) {
            setTasks(tasks.map(t => t.id === taskId ? { ...t, status } : t));
        }
    };

    const onDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    const getTypeIcon = (type: TaskType) => {
        switch (type) {
            case "Bug": return <Bug size={14} className="text-red-400" />;
            case "Story": return <Bookmark size={14} className="text-green-400 fill-green-400/20" />;
            case "Task": return <CheckSquare size={14} className="text-blue-400" />;
        }
    };

    const getPriorityIcon = (priority: Priority) => {
        switch (priority) {
            case "High": return <ArrowUp size={14} className="text-red-500" />;
            case "Medium": return <Minus size={14} className="text-yellow-500" />;
            case "Low": return <ArrowDown size={14} className="text-blue-500" />;
        }
    };

    const filteredTasks = tasks.filter(t =>
        t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col font-sans text-white">
            {/* Jira Header */}
            <div className="flex flex-col gap-4 mb-6 px-1">
                <div className="text-xs text-zinc-500 flex items-center gap-2">
                    <span>Projects</span> / <span>NitiCRMs</span> / <span className="text-zinc-300">Kanban Board</span>
                </div>

                <div className="flex justify-between items-end">
                    <h1 className="text-2xl font-bold">NitiCRMs Board</h1>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                            <input
                                type="text"
                                placeholder="Search board"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#0a0a0a] border border-white/10 rounded-md pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all w-64"
                            />
                        </div>
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black text-xs font-bold border-2 border-[#000000]">VF</div>
                            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold border-2 border-[#000000]">AI</div>
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs font-bold border-2 border-[#000000]">+2</div>
                        </div>
                        <button className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-2 rounded-md">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Board */}
            <div className="flex gap-4 overflow-x-auto pb-4 h-full min-w-full">
                {statuses.map((status) => (
                    <div
                        key={status}
                        className="flex-shrink-0 w-80 bg-[#0a0a0a] rounded-xl border border-white/5 flex flex-col max-h-full texture-matte"
                        onDrop={(e) => onDrop(e, status)}
                        onDragOver={onDragOver}
                    >
                        {/* Column Header */}
                        <div className="p-3 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-10 rounded-t-xl">
                            <h3 className="font-semibold text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                                {status}
                                <span className="bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-full text-[10px] border border-white/5">
                                    {filteredTasks.filter(t => t.status === status).length}
                                </span>
                            </h3>
                            <div className="flex gap-1">
                                <button className="text-zinc-600 hover:text-white transition-colors"><Plus size={14} /></button>
                                <button className="text-zinc-600 hover:text-white transition-colors"><MoreHorizontal size={14} /></button>
                            </div>
                        </div>

                        {/* Column Area */}
                        <div className="p-2 flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                            {filteredTasks.filter(t => t.status === status).map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, task.id)}
                                    className="p-3 bg-zinc-900/40 hover:bg-zinc-800/80 rounded-[3px] border border-transparent hover:border-primary/20 cursor-grab active:cursor-grabbing transition-all group shadow-sm flex flex-col gap-2 relative"
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm text-zinc-200 group-hover:text-primary transition-colors leading-tight">{task.summary}</p>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(task.type)}
                                            <span className="text-[10px] text-zinc-500 font-mono hover:underline cursor-pointer transition-colors">{task.id}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {task.points && (
                                                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 rounded-sm border border-white/5">{task.points}</span>
                                            )}
                                            {getPriorityIcon(task.priority)}
                                            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] text-zinc-300 font-bold border border-white/10">
                                                {task.assignee}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {/* Add Column Button */}
                <div className="flex-shrink-0 w-80 h-10 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 hover:text-primary hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer">
                    <Plus size={16} /> <span className="ml-2 text-sm font-medium">Add Column</span>
                </div>
            </div>
        </div>
    );
}
