"use client";

import Sidebar from "@/components/Sidebar";
import { Search, Bell, LogOut, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/auth-storage";
import { UserProvider, useUser } from "@/lib/UserContext";
import { LeadProvider } from "@/lib/LeadContext";

function toInitials(name: string): string {
    const chunks = name.trim().split(/\s+/).filter(Boolean);
    if (chunks.length === 0) {
        return "NA";
    }

    if (chunks.length === 1) {
        return chunks[0].slice(0, 2).toUpperCase();
    }

    return `${chunks[0][0]}${chunks[1][0]}`.toUpperCase();
}

function LayoutContent({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, organizationName, isLoading, isAuthenticated } = useUser();

    const handleLogout = () => {
        clearAuthSession();
        router.replace("/login");
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-background items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
            <Sidebar onLogout={handleLogout} />
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-3 text-muted-foreground min-w-0">
                        <span className="text-sm font-medium shrink-0">Workspace /</span>
                        <h2 className="text-sm font-bold text-foreground truncate">{organizationName}</h2>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors w-4 h-4" />
                            <input
                                type="text"
                                aria-label="Search workspace"
                                placeholder="Type to search..."
                                className="bg-muted/50 border border-input rounded-full pl-10 pr-4 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all w-64"
                            />
                        </div>

                        <button type="button" className="relative text-muted-foreground hover:text-foreground transition-colors" aria-label="Notifications">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-background" />
                        </button>

                        <div className="hidden sm:flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-primary-foreground border border-border shadow-lg shadow-primary/20">
                                {toInitials(user?.name ?? "Workspace User")}
                            </div>
                            <span className="text-sm font-medium text-foreground max-w-40 truncate">{user?.name ?? "Workspace User"}</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label="Log out"
                        >
                            <LogOut size={14} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto relative bg-background custom-scrollbar">
                    <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8 pb-20">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserProvider>
            <LeadProvider>
                <LayoutContent>{children}</LayoutContent>
            </LeadProvider>
        </UserProvider>
    );
}


