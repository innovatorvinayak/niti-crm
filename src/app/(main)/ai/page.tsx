"use client";

import { motion } from "framer-motion";
import {
    Send,
    Sparkles,
    Bot,
    User,
    MoreHorizontal,
    ThumbsUp,
    ThumbsDown,
    Zap,
    Mail,
    Calendar,
    ArrowRight
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
    action?: {
        type: "suggest_email" | "create_task" | "update_deal";
        label: string;
        data?: any;
    };
};

export default function AIAssistantPage() {
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial conversation state
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm your NitiCRMs AI assistant. I can help you summarize recent deals, draft emails, or create tasks. What would you like to do today?",
            timestamp: "10:00 AM"
        }
    ]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I've analyzed the recent activity for the 'TechFlow Enterprise' deal. It looks like they haven't responded to the last proposal sent 3 days ago.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                action: {
                    type: "suggest_email",
                    label: "Draft Follow-up Email",
                    data: { subject: "Touching base on TechFlow Proposal" }
                }
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex h-full flex-col bg-background text-foreground font-sans overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">AI Assistant</h1>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar text-sm">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border border-border ${msg.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                            }`}>
                            {msg.role === "user" ? <User size={14} /> : <Bot size={16} />}
                        </div>

                        {/* Bubble */}
                        <div className={`max-w-[80%] space-y-2`}>
                            <div className={`p-4 rounded-2xl border ${msg.role === "user"
                                ? "bg-secondary border-secondary text-secondary-foreground rounded-tr-sm"
                                : "bg-card border-border text-foreground rounded-tl-sm shadow-sm"
                                }`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>

                            {/* Suggested Action Card */}
                            {msg.action && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="p-3 bg-muted/30 border border-border rounded-xl flex items-center justify-between group hover:border-primary/30 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                            {msg.action.type === "suggest_email" && <Mail size={16} />}
                                            {msg.action.type === "create_task" && <Zap size={16} />}
                                            {msg.action.type === "update_deal" && <Calendar size={16} />}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-medium text-foreground text-xs">Suggested Action</div>
                                            <div className="text-muted-foreground text-xs">{msg.action.label}</div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1">
                                        Run <ArrowRight size={12} />
                                    </button>
                                </motion.div>
                            )}

                            <div className={`text-[10px] text-muted-foreground flex items-center gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <span>{msg.timestamp}</span>
                                {msg.role === "assistant" && (
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="hover:text-foreground"><ThumbsUp size={10} /></button>
                                        <button className="hover:text-foreground"><ThumbsDown size={10} /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex-shrink-0 flex items-center justify-center text-xs font-bold border border-border">
                            <Bot size={16} />
                        </div>
                        <div className="bg-card border border-border p-4 rounded-2xl rounded-tl-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border">
                <div className="max-w-4xl mx-auto relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-20 transition-opacity rounded-2xl" />
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask AI to find deals, draft emails, or summarize tasks..."
                        className="w-full bg-muted text-foreground placeholder:text-muted-foreground border border-border rounded-2xl py-4 pl-5 pr-14 resize-none focus:outline-none focus:border-primary/40 focus:bg-background transition-all min-h-[60px] max-h-32 shadow-2xl custom-scrollbar"
                        rows={1}
                        style={{ height: '60px' }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-3 bottom-3 p-2 bg-primary text-primary-foreground rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all disabled:cursor-not-allowed shadow-lg shadow-primary/10"
                    >
                        <Send size={18} fill="currentColor" />
                    </button>
                </div>
                <div className="text-center mt-3 text-[10px] text-muted-foreground">
                    AI can make mistakes. Consider checking important information.
                </div>
            </div>
        </div>
    );
}
