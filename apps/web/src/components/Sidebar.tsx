"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    KanbanSquare,
    CheckSquare,
    Settings,
    LogOut,
    Sparkles,
    BarChart3,
    Activity,
    MessageSquare,
    Workflow,
    Mail,
    BrainCircuit,
    Banknote,
    Megaphone,
    LifeBuoy,
    Trophy
} from "lucide-react";
import Image from "next/image";
import { useUser } from "@/lib/UserContext";

type SidebarProps = {
    onLogout?: () => void;
};

const Sidebar = ({ onLogout }: SidebarProps) => {
    const pathname = usePathname();
    const { user } = useUser();

    function toSidebarInitials(name: string): string {
        const chunks = name.trim().split(/\s+/).filter(Boolean);
        if (chunks.length === 0) return "??";
        if (chunks.length === 1) return chunks[0].slice(0, 2).toUpperCase();
        return `${chunks[0][0]}${chunks[1][0]}`.toUpperCase();
    }

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Contacts", href: "/contacts", icon: Users },
        { name: "Pipeline", href: "/pipeline", icon: KanbanSquare },
        { name: "Tasks", href: "/tasks", icon: CheckSquare },
        { name: "Automations", href: "/automations", icon: Workflow },
        { name: "Campaigns", href: "/campaigns", icon: Mail },
        { name: "Marketing", href: "/marketing", icon: Megaphone },
        { name: "Finance", href: "/finance", icon: Banknote },
        { name: "Support", href: "/support", icon: LifeBuoy },
        { name: "Team", href: "/team-performance", icon: Trophy },
        { name: "Comms", href: "/comms", icon: MessageSquare },
        { name: "Activities", href: "/activities", icon: Activity },
        { name: "Intelligence", href: "/intelligence", icon: BrainCircuit },
        { name: "AI Assistant", href: "/ai", icon: Sparkles },
        { name: "Reports", href: "/reports", icon: BarChart3 },
    ];

    return (
        <aside className="w-[260px] bg-card border-r border-border flex flex-col sticky top-0 h-screen texture-matte overflow-y-auto custom-scrollbar">
            <div className="px-6 py-8">
                <Image src="/logo_wordmark.jpg" alt="NitiCRMs" width={170} height={50} className="rounded-lg object-contain" />
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all relative group ${isActive
                                ? "text-primary-foreground texture-paper shadow-md shadow-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                        >
                            <item.icon size={18} className={isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="px-6 py-4">
                <div className="p-4 bg-muted border border-border rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground border border-border">
                            {toSidebarInitials(user?.name ?? "User")}
                        </div>
                        <div className="min-w-0">
                            <p className="text-foreground text-sm font-bold truncate">{user?.name ?? "Workspace User"}</p>
                            <p className="text-muted-foreground text-xs capitalize">{user?.role ?? "Member"}</p>
                        </div>
                    </div>
                    <Link href="/team" className="text-xs text-primary hover:underline flex items-center gap-1 group">
                        Manage Team <Users size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>

            <div className="mt-auto p-4 border-t border-border space-y-1">
                <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                    <Settings size={18} className="text-muted-foreground hover:text-foreground" />
                    <span>Settings</span>
                </Link>
                <button
                    type="button"
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-500/10 transition-all text-left"
                >
                    <LogOut size={18} className="text-muted-foreground hover:text-red-600" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
