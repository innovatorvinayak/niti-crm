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

const contacts: Contact[] = [
    { id: "1", name: "Alice Freeman", status: "online", lastMessage: "Sounds good, let's schedule for Tuesday.", time: "10:30 AM", avatar: "AF", unread: 2 },
    { id: "2", name: "Bob Smith", status: "offline", lastMessage: "Can you send the updated proposal?", time: "Yesterday", avatar: "BS" },
    { id: "3", name: "Charlie Davis", status: "busy", lastMessage: "I'll get back to you on that.", time: "Monday", avatar: "CD" },
    { id: "4", name: "Diana Prince", status: "online", lastMessage: "Thanks for the quick turnaround!", time: "Sunday", avatar: "DP" },
];

const chatHistory: Message[] = [
    { id: "1", senderId: "2", text: "Hey Vinayak, quick question about the TechFlow deal.", time: "10:00 AM" },
    { id: "2", senderId: "me", text: "Sure Bob, what's up?", time: "10:05 AM" },
    { id: "3", senderId: "2", text: "Did we get the signed NDA back yet?", time: "10:06 AM" },
    { id: "4", senderId: "me", text: "Checking now... Yes, it came in this morning. I've uploaded it to the deal file.", time: "10:08 AM" },
    { id: "5", senderId: "2", text: "Awesome, thanks! Can you send the updated proposal?", time: "Yesterday" },
];

export default function CommsPage() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[1]); // Default to Bob
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
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            {/* Sidebar List */}
            <div className="w-full md:w-80 border-r border-white/5 flex flex-col bg-[#050505]">
                <div className="p-4 border-b border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Messages</h1>
                        <button className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-white/[0.02] hover:bg-white/[0.02] ${selectedContact?.id === contact.id ? "bg-white/[0.05]" : ""
                                }`}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm border border-white/10">
                                    {contact.avatar}
                                </div>
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${contact.status === "online" ? "bg-green-500" :
                                        contact.status === "busy" ? "bg-red-500" : "bg-zinc-500"
                                    }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-sm truncate text-white">{contact.name}</h3>
                                    <span className="text-[10px] text-zinc-500">{contact.time}</span>
                                </div>
                                <p className={`text-xs truncate ${contact.unread ? "text-white font-medium" : "text-zinc-500"}`}>
                                    {contact.lastMessage}
                                </p>
                            </div>
                            {contact.unread && (
                                <div className="w-5 h-5 rounded-full bg-primary text-black flex items-center justify-center text-[10px] font-bold">
                                    {contact.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            {selectedContact ? (
                <div className="flex-1 flex flex-col bg-[#0a0a0a] relative texture-matte">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/50 backdrop-blur-md z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold border border-white/10">
                                {selectedContact.avatar}
                            </div>
                            <div>
                                <h2 className="font-bold text-sm text-white">{selectedContact.name}</h2>
                                <p className="text-xs text-zinc-500 flex items-center gap-1">
                                    {selectedContact.status === "online" ? (
                                        <><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active now</>
                                    ) : (
                                        "Last seen recently"
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                <Phone size={18} />
                            </button>
                            <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                <Video size={18} />
                            </button>
                            <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors">
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
                                            ? "bg-primary text-black rounded-tr-sm"
                                            : "bg-zinc-900 border border-white/10 text-zinc-300 rounded-tl-sm"
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-zinc-600 px-1">
                                        <span>{msg.time}</span>
                                        {msg.senderId === "me" && <CheckCheck size={12} className="text-primary" />}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-black border-t border-white/5">
                        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-[#0a0a0a] border border-white/10 rounded-xl p-2 focus-within:border-white/20 transition-all shadow-lg">
                            <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
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
                                className="flex-1 bg-transparent text-white placeholder:text-zinc-600 border-none resize-none focus:ring-0 max-h-32 py-2 text-sm custom-scrollbar"
                                rows={1}
                            />
                            <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                <Smile size={20} />
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim()}
                                className="p-2 bg-primary text-black rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} fill="currentColor" />
                            </button>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0a0a] text-zinc-500">
                    <MessageSquare size={48} className="mb-4 opacity-50" />
                    <p>Select a conversation to start chatting</p>
                </div>
            )}
        </div>
    );
}
