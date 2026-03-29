"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    MoreHorizontal,
    Plus,
    Phone,
    Video,
    MessageSquare,
    Send,
    Smile,
    Paperclip,
    CheckCheck,
    Archive,
    Trash2
} from "lucide-react";
import { useState } from "react";

type Contact = {
    id: string;
    name: string;
    status: "online" | "offline" | "busy";
    lastMessage: string;
    time: string;
    avatar: string; // Initial
    unread?: number;
};

type Message = {
    id: string;
    senderId: string;
    text: string;
    time: string;
    isMedia?: boolean;
};

const contacts: Contact[] = [];

const chatHistory: Message[] = [];

export default function CommsPage() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [messages, setMessages] = useState<Message[]>(chatHistory);
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, {
            id: Date.now().toString(),
            senderId: "me",
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setInputText("");
    };

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
            {/* Sidebar List */}
            <div className="w-full md:w-80 border-r border-border flex flex-col bg-card">
                <div className="p-4 border-b border-border space-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Messages</h1>
                        <button className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full bg-muted border border-transparent rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {contacts.length === 0 ? (
                        <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
                             <MessageSquare size={32} className="opacity-20" />
                             No conversations found
                        </div>
                    ) : (
                        contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedContact(contact)}
                                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-border hover:bg-muted/50 ${selectedContact?.id === contact.id ? "bg-muted" : ""
                                    }`}
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm border border-border text-muted-foreground">
                                        {contact.avatar}
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${contact.status === "online" ? "bg-green-500" :
                                        contact.status === "busy" ? "bg-red-500" : "bg-zinc-400"
                                        }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-sm truncate text-foreground">{contact.name}</h3>
                                        <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                                    </div>
                                    <p className={`text-xs truncate ${contact.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                                        {contact.lastMessage}
                                    </p>
                                </div>
                                {contact.unread && (
                                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                                        {contact.unread}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            {selectedContact ? (
                <div className="flex-1 flex flex-col bg-background relative texture-matte">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-md z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold border border-border text-muted-foreground">
                                {selectedContact.avatar}
                            </div>
                            <div>
                                <h2 className="font-bold text-sm text-foreground">{selectedContact.name}</h2>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    {selectedContact.status === "online" ? (
                                        <><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active now</>
                                    ) : (
                                        "Last seen recently"
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                <Phone size={18} />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                <Video size={18} />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[70%] space-y-1 ${msg.senderId === "me" ? "items-end" : "items-start"}`}>
                                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.senderId === "me"
                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                        : "bg-muted border border-border text-foreground rounded-tl-sm"
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground px-1">
                                        <span>{msg.time}</span>
                                        {msg.senderId === "me" && <CheckCheck size={12} className="text-primary" />}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-background border-t border-border">
                        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-muted border border-border rounded-xl p-2 focus-within:border-primary/30 transition-all shadow-lg">
                            <button className="p-2 hover:bg-background/50 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                <Plus size={20} />
                            </button>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground border-none resize-none focus:ring-0 max-h-32 py-2 text-sm custom-scrollbar"
                                rows={1}
                            />
                            <button className="p-2 hover:bg-background/50 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                <Smile size={20} />
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim()}
                                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} fill="currentColor" />
                            </button>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-background text-muted-foreground">
                    <MessageSquare size={48} className="mb-4 opacity-50" />
                    <p>Select a conversation to start chatting</p>
                </div>
            )}
        </div>
    );
}
