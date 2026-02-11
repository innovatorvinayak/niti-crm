"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    TrendingUp,
    TrendingDown,
    DollarSign,
    AlertCircle,
    Plus,
    Zap,
    ArrowUpRight,
    Search,
    Filter,
    Activity,
    Calendar,
    CheckSquare,
    Target,
    BarChart3,
    MoreHorizontal,
    LayoutDashboard,
    PieChart,
    Briefcase,
    Bell,
    Settings,
    MessageSquare,
    Link as LinkIcon,
    Info
} from "lucide-react";
import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<"executive" | "sales" | "ai" | "productivity">("executive");

    return (
        <div className="flex flex-col h-full bg-background text-foreground font-sans overflow-hidden">
            {/* Top Toolbar / Tab Navigation */}
            <div className="h-16 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-20 flex px-6 items-center justify-between">
                <div className="flex bg-muted p-1 rounded-lg border border-border">
                    <TabButton active={activeTab === "executive"} onClick={() => setActiveTab("executive")} icon={LayoutDashboard} label="Overview" />
                    <TabButton active={activeTab === "sales"} onClick={() => setActiveTab("sales")} icon={TrendingUp} label="Sales Pipeline" />
                    <TabButton active={activeTab === "ai"} onClick={() => setActiveTab("ai")} icon={Zap} label="AI Insights" extra="Beta" />
                    <TabButton active={activeTab === "productivity"} onClick={() => setActiveTab("productivity")} icon={CheckSquare} label="Productivity" />
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground hover:text-foreground transition-colors relative">
                        <Bell size={18} />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></div>
                    </button>
                    <div className="h-8 w-[1px] bg-border"></div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
                        <Plus size={16} /> <span className="hidden md:inline">Quick Action</span>
                    </button>
                </div>
            </div>

            {/* Dashboard Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -10 }}
                        variants={container}
                        className="space-y-6 max-w-7xl mx-auto"
                    >
                        {activeTab === "executive" && <ExecutiveView />}
                        {activeTab === "sales" && <SalesView />}
                        {activeTab === "ai" && <AiView />}
                        {activeTab === "productivity" && <ProductivityView />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// --- Views ---

function ExecutiveView() {
    return (
        <>
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Executive Overview</h2>
                    <p className="text-muted-foreground text-sm">Real-time snapshot of company health.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded border border-border">
                    <Calendar size={12} /> Last 30 Days
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                    label="Total Revenue (MRR)"
                    value="$124,500"
                    change="+15.2%"
                    isPositive
                    icon={DollarSign}
                    className="bg-green-50 border-green-200"
                    iconColor="text-green-600"
                    tooltip="Monthly Recurring Revenue: The predictable revenue expected to be earned every month."
                />
                <KpiCard
                    label="Active Opportunities"
                    value="42"
                    change="+8"
                    isPositive
                    icon={Target}
                    className="bg-blue-50 border-blue-200"
                    iconColor="text-blue-600"
                    tooltip="Deals currently in the pipeline that have not yet been won or lost."
                />
                <KpiCard
                    label="Pipeline Value"
                    value="$1.2M"
                    change="+$0.3M"
                    isPositive
                    icon={BarChart3}
                    className="bg-purple-50 border-purple-200"
                    iconColor="text-purple-600"
                    tooltip="The total projected value of all open deals in the sales pipeline."
                />
                <KpiCard
                    label="Win Rate"
                    value="24.8%"
                    change="-1.2%"
                    isPositive={false}
                    icon={PieChart}
                    className="bg-orange-50 border-orange-200"
                    iconColor="text-orange-600"
                    tooltip="The percentage of opportunities that are successfully converted into closed-won deals."
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 min-h-[350px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-foreground">Revenue vs Target</h3>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-primary"></div> Actual
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-zinc-400"></div> Target
                            </div>
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <LineChartMock />
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
                        <Activity size={18} className="text-muted-foreground" /> Live Feed
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[300px]">
                        <FeedItem title="New Deal: TechFlow" user="VF" time="10m ago" type="deal" />
                        <FeedItem title="Call logged: Alice F." user="BS" time="45m ago" type="call" />
                        <FeedItem title="Invoice Paid: #INV001" user="System" time="1h ago" type="money" />
                        <FeedItem title="Email Opened: Intro" user="VF" time="2h ago" type="email" />
                        <FeedItem title="Ticket Created: #921" user="System" time="3h ago" type="alert" />
                    </div>
                    <button className="w-full mt-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs font-medium text-muted-foreground transition-colors border border-border">
                        View Full History
                    </button>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MiniStat label="Avg Deal Size" value="$12,500" tooltip="The average revenue value of a closed-won deal." />
                <MiniStat label="Sales Cycle" value="24 days" tooltip="The average number of days it takes to close a deal from first contact." />
                <MiniStat label="CAC" value="$420" tooltip="Customer Acquisition Cost: The average expense incurred to acquire a single new customer." />
                <MiniStat label="LTV" value="$14,500" tooltip="Lifetime Value: The total revenue expected from a single customer over their entire relationship." />
            </div>
        </>
    );
}

function SalesView() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Pipeline Analytics</h2>
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors">
                    Add Deal
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Funnel */}
                <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1">
                    <h3 className="font-bold text-lg mb-6 text-foreground">Conversion Funnel</h3>
                    <div className="space-y-2">
                        <FunnelBar label="Lead" count={1240} color="bg-zinc-300" width="100%" />
                        <FunnelBar label="MQL" count={850} color="bg-zinc-400" width="80%" />
                        <FunnelBar label="SQL" count={420} color="bg-blue-300" width="60%" />
                        <FunnelBar label="Proposal" count={180} color="bg-blue-400" width="40%" />
                        <FunnelBar label="Negotiation" count={85} color="bg-blue-600" width="25%" />
                        <FunnelBar label="Won" count={42} color="bg-green-500" width="15%" />
                    </div>
                </div>

                {/* Stage Breakdown */}
                <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
                    <h3 className="font-bold text-lg mb-4 text-foreground">Deals by Stage & Rep</h3>
                    <div className="h-[300px]">
                        <BarChartMock />
                    </div>
                </div>
            </div>

            {/* Quick Deal List */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Top Opportunities</h3>
                    <Filter size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
                </div>
                <div className="divide-y divide-border">
                    {[
                        { name: "Acme Corp Enterprise", value: "$450,000", stage: "Negotiation", prob: "85%" },
                        { name: "Global Systems Inc", value: "$125,000", stage: "Proposal", prob: "60%" },
                        { name: "Stark Industries", value: "$850,000", stage: "Qualification", prob: "20%" },
                    ].map((deal, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors group">
                            <div>
                                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{deal.name}</h4>
                                <span className="text-xs text-muted-foreground">{deal.stage}</span>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-bold text-green-600">{deal.value}</div>
                                <span className="text-xs text-muted-foreground">{deal.prob} probability</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AiView() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 w-fit flex items-center gap-2">
                <Zap fill="currentColor" className="text-purple-400" />
                Cortex Intelligence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Anomaly Detection */}
                <div className="p-6 bg-red-50 border border-red-200 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <AlertCircle size={80} className="text-red-900" />
                    </div>
                    <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2"><AlertCircle size={18} /> Churn Risk Detected</h3>
                    <p className="text-sm text-red-700/80 mb-4">AI detected a drop in login frequency for account <strong>&quot;TechStart&quot;</strong>. Risk score increased to 85%.</p>
                    <button className="px-4 py-2 bg-white hover:bg-white/80 text-red-700 rounded-lg text-sm font-bold w-full transition-colors border border-red-100 shadow-sm">
                        View Analysis
                    </button>
                </div>

                {/* Hot Lead */}
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp size={80} className="text-green-900" />
                    </div>
                    <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2"><TrendingUp size={18} /> Buying Signal</h3>
                    <p className="text-sm text-green-700/80 mb-4">Lead <strong>Alice Freeman</strong> viewed the &quot;Pricing&quot; page 3 times today.</p>
                    <button className="px-4 py-2 bg-white hover:bg-white/80 text-green-700 rounded-lg text-sm font-bold w-full transition-colors border border-green-100 shadow-sm">
                        Draft Email
                    </button>
                </div>

                {/* Next Best Action */}
                <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Briefcase size={80} className="text-purple-900" />
                    </div>
                    <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2"><Briefcase size={18} /> Deal Velocity</h3>
                    <p className="text-sm text-purple-700/80 mb-4">Deal <strong>&quot;Project X&quot;</strong> is stalled in &quot;Proposal&quot; for &gt;14 days. Recommend scheduling a demo.</p>
                    <button className="px-4 py-2 bg-white hover:bg-white/80 text-purple-700 rounded-lg text-sm font-bold w-full transition-colors border border-purple-100 shadow-sm">
                        Schedule Meeting
                    </button>
                </div>
            </div>

            {/* AI Assistant Chat (Mock) */}
            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4 text-foreground">Daily Briefing</h3>
                <div className="bg-muted rounded-lg p-4 border border-border text-sm text-foreground leading-relaxed font-mono">
                    <span className="text-purple-600 font-bold">{'>'} Summarizing key events...</span><br /><br />
                    • Revenue is trending <span className="text-green-600">up 15%</span> compared to last month.<br />
                    • You have <span className="text-yellow-600">3 overdue tasks</span> that require attention.<br />
                    • Competitor "SalesForce" was mentioned in 2 calls today.<br />
                    • Suggestion: Follow up with Bob Smith regarding the Q3 upgrade.
                </div>
            </div>
        </div>
    );
}

function ProductivityView() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">My Workspace</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tasks */}
                <div className="bg-card border border-border rounded-xl lg:col-span-2 overflow-hidden">
                    <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                        <h3 className="font-bold text-foreground">Today's Tasks</h3>
                        <button className="text-muted-foreground hover:text-foreground"><Plus size={16} /></button>
                    </div>
                    <div className="divide-y divide-border">
                        {[
                            { title: "Review Q3 Report", time: "10:00 AM", priority: "High" },
                            { title: "Call with TechFlow", time: "11:30 AM", priority: "Medium" },
                            { title: "Update CRM records", time: "2:00 PM", priority: "Low" },
                            { title: "Team Sync", time: "4:00 PM", priority: "Medium" },
                        ].map((task, i) => (
                            <div key={i} className="p-4 flex items-center gap-4 hover:bg-muted/50 group">
                                <button className="w-5 h-5 rounded border border-muted-foreground/30 group-hover:border-primary flex items-center justify-center text-transparent hover:text-primary transition-colors">
                                    <CheckSquare size={12} fill="currentColor" />
                                </button>
                                <div className="flex-1">
                                    <h4 className={`text-sm ${task.priority === 'High' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{task.title}</h4>
                                    <p className="text-xs text-muted-foreground">{task.time}</p>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-500/10 text-red-600' :
                                    task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' :
                                        'bg-blue-500/10 text-blue-600'
                                    }`}>{task.priority}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calendar Preview */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-foreground">Schedule</h3>
                        <Calendar size={16} className="text-muted-foreground" />
                    </div>
                    {/* Mock Calendar Lines */}
                    <div className="space-y-3 relative">
                        <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-border"></div>
                        <EventCard time="09:00" title="Standup" duration="30m" color="bg-blue-500" />
                        <EventCard time="11:30" title="Client Call" duration="1h" color="bg-purple-500" />
                        <EventCard time="14:00" title="Deep Work" duration="2h" color="bg-zinc-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Components ---

function TabButton({ active, onClick, icon: Icon, label, extra }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all relative ${active ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
        >
            <Icon size={16} className={active ? "text-primary-foreground" : ""} />
            {label}
            {extra && <span className="text-[9px] bg-primary text-primary-foreground px-1 rounded font-bold ml-1">{extra}</span>}
        </button>
    );
}

function TooltipTrigger({ text }: { text: string }) {
    if (!text) return null;
    return (
        <div className="group/tooltip relative flex items-center justify-center transform hover:scale-110 transition-transform">
            <Info size={12} className="text-muted-foreground hover:text-foreground cursor-help" />
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2.5 bg-foreground border border-border rounded-xl shadow-2xl z-50 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity text-[10px] text-background text-center leading-relaxed backdrop-blur-md">
                {text}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground"></div>
            </div>
        </div>
    );
}

function KpiCard({ label, value, change, isPositive, icon: Icon, className, iconColor, tooltip }: any) {
    return (
        <motion.div variants={item} className={`relative p-4 rounded-xl border ${className} group`}>
            {/* Background Icon Layer - Clipped */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:scale-110 transition-transform">
                    <Icon size={64} className={iconColor} />
                </div>
            </div>

            {/* Content Layer - Not Clipped (for Tooltip) */}
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <Icon size={20} className={iconColor} />
                        {tooltip && <TooltipTrigger text={tooltip} />}
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/50 border border-black/5 ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
                        {change}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
                <p className="text-muted-foreground text-xs mt-1 font-medium">{label}</p>
            </div>
        </motion.div>
    );
}

function MiniStat({ label, value, tooltip }: any) {
    return (
        <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between group">
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">{label}</span>
                {tooltip && <TooltipTrigger text={tooltip} />}
            </div>
            <span className="text-foreground font-bold font-mono">{value}</span>
        </div>
    );
}

function FeedItem({ title, user, time, type }: any) {
    const icons: any = {
        deal: DollarSign,
        call: MessageSquare,
        money: CheckSquare,
        email: LinkIcon, // placeholder
        alert: AlertCircle
    };
    const Icon = icons[type] || Activity;

    return (
        <div className="flex gap-3 items-start group">
            <div className="mt-1 min-w-[24px] h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground border border-border group-hover:border-border transition-colors">
                <Icon size={12} />
            </div>
            <div>
                <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{title}</p>
                <p className="text-[10px] text-muted-foreground">{user} • {time}</p>
            </div>
        </div>
    );
}

function FunnelBar({ label, count, color, width }: any) {
    return (
        <div className="relative h-8 flex items-center mb-1 group cursor-pointer">
            <div
                className={`h-full rounded-r-md flex items-center justify-between px-3 text-xs font-bold text-white shadow-sm ${color} hover:brightness-110 transition-all`}
                style={{ width }}
            >
                <span>{label}</span>
                <span className="opacity-80 font-mono">{count}</span>
            </div>
        </div>
    );
}

function EventCard({ time, title, duration, color }: any) {
    return (
        <div className="flex gap-3 relative z-10 ml-2">
            <div className="text-[10px] text-muted-foreground font-mono pt-1 w-8 text-right">{time}</div>
            <div className={`flex-1 p-2 rounded border border-border ${color}/10`}>
                <h4 className="text-xs font-bold text-foreground">{title}</h4>
                <p className="text-[10px] text-muted-foreground">{duration}</p>
            </div>
        </div>
    );
}

// --- Charts (Mock Configs with React Chartjs) ---
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#000',
            bodyColor: '#666',
            borderColor: '#e4e4e7',
            borderWidth: 1
        }
    },
    scales: {
        x: { grid: { display: false, color: '#f4f4f5' }, ticks: { color: '#71717a' } },
        y: { grid: { color: '#f4f4f5' }, ticks: { color: '#71717a' } }
    }
};

function LineChartMock() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue',
                data: [65, 59, 80, 81, 56, 120],
                borderColor: '#18181b', // Primary black
                backgroundColor: 'rgba(24, 24, 27, 0.05)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#18181b',
            },
            {
                label: 'Target',
                data: [70, 70, 75, 80, 85, 90],
                borderColor: '#a1a1aa',
                borderDash: [5, 5],
                tension: 0.1,
                pointRadius: 0
            }
        ],
    };
    return <Line options={chartOptions as any} data={data} />;
}

function BarChartMock() {
    const data = {
        labels: ['Lead', 'MQL', 'SQL', 'Prop', 'Won'],
        datasets: [
            {
                label: 'Diana',
                data: [42, 30, 20, 15, 12],
                backgroundColor: '#18181b',
            },
            {
                label: 'Bob',
                data: [35, 25, 15, 10, 8],
                backgroundColor: '#d4d4d8',
            },
        ],
    };
    return <Bar options={chartOptions as any} data={data} />;
}
