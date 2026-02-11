"use client";

import { motion } from "framer-motion";
import {
    Globe,
    Lock,
    Bell,
    CreditCard,
    User,
    Tags,
    Workflow,
    Shield,
    Database,
    Upload,
    Save
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("Profile");

    const tabs = [
        { name: "Profile", icon: User },
        { name: "Organization", icon: Globe },
        { name: "Pipeline", icon: Workflow },
        { name: "Tags & Fields", icon: Tags },
        { name: "Notifications", icon: Bell },
        { name: "Security", icon: Lock },
        { name: "Billing", icon: CreditCard },
        { name: "Audit Log", icon: Shield },
        { name: "API & Data", icon: Database },
    ];

    return (
        <div className="flex h-full flex-col md:flex-row bg-[#0a0a0a] min-h-screen text-white font-sans">
            {/* Settings Sidebar */}
            <div className="w-full md:w-64 border-r border-white/5 bg-[#050505] flex-shrink-0">
                <div className="p-6 border-b border-white/5 mb-4">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        Settings
                    </h1>
                    <p className="text-zinc-500 text-xs mt-1">Manage your workspace preferences.</p>
                </div>

                <nav className="space-y-1 px-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.name
                                    ? "bg-white/10 text-white"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-3xl"
                >
                    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                        <div>
                            <h2 className="text-2xl font-bold">{activeTab}</h2>
                            <p className="text-zinc-500 text-sm">Manage your {activeTab.toLowerCase()} settings</p>
                        </div>
                        <button className="px-4 py-2 bg-primary hover:bg-white text-black rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 texture-paper">
                            <Save size={16} /> Save Changes
                        </button>
                    </div>

                    {/* Placeholder Content for Tabs */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-6">

                        {activeTab === "Profile" && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center cursor-pointer hover:border-primary transition-colors group relative overflow-hidden">
                                        <Upload className="text-zinc-500 group-hover:text-primary z-10" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Profile Picture</h3>
                                        <p className="text-zinc-500 text-sm">Upload a new avatar. Max size 2MB.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">First Name</label>
                                        <input type="text" defaultValue="Vinayak" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Last Name</label>
                                        <input type="text" defaultValue="Furiya" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-primary/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Email Address</label>
                                    <input type="email" defaultValue="vinayak@niticrms.com" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-primary/50" />
                                </div>
                            </div>
                        )}

                        {activeTab === "Organization" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Company Name</label>
                                    <input type="text" defaultValue="NitiCRMs Inc." className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-primary/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Website</label>
                                    <input type="url" defaultValue="https://niticrms.com" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-primary/50" />
                                </div>
                            </div>
                        )}

                        {/* More placeholders for other tabs would go here */}
                        {!["Profile", "Organization"].includes(activeTab) && (
                            <div className="text-center py-20 text-zinc-500">
                                This section is under construction.
                            </div>
                        )}

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
