"use client";

import Sidebar from "@/components/Sidebar";
import { Search, Bell } from "lucide-react";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="text-sm font-medium">Workspace /</span>
                        <h2 className="text-sm font-bold text-foreground">My Organization</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Type to search..."
                                className="bg-muted/50 border border-input rounded-full pl-10 pr-4 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all w-64"
                            />
                        </div>

                        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
                        </button>

                        <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-primary-foreground border border-border shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform">
                            AD
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto relative bg-background custom-scrollbar">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto p-8 pb-20">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
