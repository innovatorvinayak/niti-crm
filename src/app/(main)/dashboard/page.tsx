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
        <div className="flex flex-col h-full bg-black text-white font-sans overflow-hidden">
            {/* Top Toolbar / Tab Navigation */}
            <div className="h-16 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-20 flex px-6 items-center justify-between">
                <div className="flex bg-[#121212] p-1 rounded-lg border border-white/5">
                    <TabButton active={activeTab === "executive"} onClick={() => setActiveTab("executive")} icon={LayoutDashboard} label="Overview" />
                    <TabButton active={activeTab === "sales"} onClick={() => setActiveTab("sales")} icon={TrendingUp} label="Sales Pipeline" />
                    <TabButton active={activeTab === "ai"} onClick={() => setActiveTab("ai")} icon={Zap} label="AI Insights" extra="Beta" />
                    <TabButton active={activeTab === "productivity"} onClick={() => setActiveTab("productivity")} icon={CheckSquare} label="Productivity" />
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors relative">
                        <Bell size={18} />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></div>
                    </button>
                    <div className="h-8 w-[1px] bg-white/10"></div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-black rounded-lg text-sm font-bold hover:bg-white transition-colors shadow-[0_0_15px_-3px_rgba(245,245,220,0.3)]">
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
                    <h2 className="text-2xl font-bold text-white">Executive Overview</h2>
                    <p className="text-zinc-500 text-sm">Real-time snapshot of company health.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5">
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
                    color="from-green-500/20 to-emerald-500/5"
                    text="text-green-400"
                    tooltip="Monthly Recurring Revenue: The predictable revenue expected to be earned every month."
                />
                <KpiCard
                    label="Active Opportunities"
                    value="42"
                    change="+8"
                    isPositive
                    icon={Target}
                    color="from-blue-500/20 to-indigo-500/5"
                    text="text-blue-400"
                    tooltip="Deals currently in the pipeline that have not yet been won or lost."
                />
                <KpiCard
                    label="Pipeline Value"
                    value="$1.2M"
                    change="+$0.3M"
                    isPositive
                    icon={BarChart3}
                    color="from-purple-500/20 to-fuchsia-500/5"
                    text="text-purple-400"
                    tooltip="The total projected value of all open deals in the sales pipeline."
                />
                <KpiCard
                    label="Win Rate"
                    value="24.8%"
                    change="-1.2%"
                    isPositive={false}
                    icon={PieChart}
                    color="from-orange-500/20 to-red-500/5"
                    text="text-orange-400"
                    tooltip="The percentage of opportunities that are successfully converted into closed-won deals."
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-xl p-6 min-h-[350px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Revenue vs Target</h3>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                <div className="w-2 h-2 rounded-full bg-primary"></div> Actual
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                <div className="w-2 h-2 rounded-full bg-zinc-600"></div> Target
                            </div>
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <LineChartMock />
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 flex flex-col">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-zinc-500" /> Live Feed
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[300px]">
                        <FeedItem title="New Deal: TechFlow" user="VF" time="10m ago" type="deal" />
                        <FeedItem title="Call logged: Alice F." user="BS" time="45m ago" type="call" />
                        <FeedItem title="Invoice Paid: #INV001" user="System" time="1h ago" type="money" />
                        <FeedItem title="Email Opened: Intro" user="VF" time="2h ago" type="email" />
                        <FeedItem title="Ticket Created: #921" user="System" time="3h ago" type="alert" />
                    </div>
                    <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-zinc-400 transition-colors border border-white/5">
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
                <h2 className="text-2xl font-bold text-white">Pipeline Analytics</h2>
                <button className="px-4 py-2 bg-primary text-black text-sm font-bold rounded-lg hover:bg-white transition-colors">
                    Add Deal
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Funnel */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 lg:col-span-1">
                    <h3 className="font-bold text-lg mb-6">Conversion Funnel</h3>
                    <div className="space-y-2">
                        <FunnelBar label="Lead" count={1240} color="bg-zinc-700" width="100%" />
                        <FunnelBar label="MQL" count={850} color="bg-zinc-600" width="80%" />
                        <FunnelBar label="SQL" count={420} color="bg-blue-900" width="60%" />
                        <FunnelBar label="Proposal" count={180} color="bg-blue-700" width="40%" />
                        <FunnelBar label="Negotiation" count={85} color="bg-blue-500" width="25%" />
                        <FunnelBar label="Won" count={42} color="bg-green-500" width="15%" />
                    </div>
                </div>

                {/* Stage Breakdown */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 lg:col-span-2">
                    <h3 className="font-bold text-lg mb-4">Deals by Stage & Rep</h3>
                    <div className="h-[300px]">
                        <BarChartMock />
                    </div>
                </div>
            </div>

            {/* Quick Deal List */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-400">Top Opportunities</h3>
                    <Filter size={16} className="text-zinc-500 hover:text-white cursor-pointer" />
                </div>
                <div className="divide-y divide-white/5">
                    {[
                        { name: "Acme Corp Enterprise", value: "$450,000", stage: "Negotiation", prob: "85%" },
                        { name: "Global Systems Inc", value: "$125,000", stage: "Proposal", prob: "60%" },
                        { name: "Stark Industries", value: "$850,000", stage: "Qualification", prob: "20%" },
                    ].map((deal, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                            <div>
                                <h4 className="font-bold text-white group-hover:text-primary transition-colors">{deal.name}</h4>
                                <span className="text-xs text-zinc-500">{deal.stage}</span>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-bold text-green-400">{deal.value}</div>
                                <span className="text-xs text-zinc-500">{deal.prob} probability</span>
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
                <div className="p-6 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertCircle size={80} />
                    </div>
                    <h3 className="font-bold text-red-200 mb-2 flex items-center gap-2"><AlertCircle size={18} /> Churn Risk Detected</h3>
                    <p className="text-sm text-zinc-400 mb-4">AI detected a drop in login frequency for account <strong>"TechStart"</strong>. Risk score increased to 85%.</p>
                    <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-sm font-bold w-full transition-colors border border-red-500/20">
                        View Analysis
                    </button>
                </div>

                {/* Hot Lead */}
                <div className="p-6 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={80} />
                    </div>
                    <h3 className="font-bold text-green-200 mb-2 flex items-center gap-2"><TrendingUp size={18} /> Buying Signal</h3>
                    <p className="text-sm text-zinc-400 mb-4">Lead <strong>Alice Freeman</strong> viewed the "Pricing" page 3 times today.</p>
                    <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-200 rounded-lg text-sm font-bold w-full transition-colors border border-green-500/20">
                        Draft Email
                    </button>
                </div>

                {/* Next Best Action */}
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Briefcase size={80} />
                    </div>
                    <h3 className="font-bold text-purple-200 mb-2 flex items-center gap-2"><Briefcase size={18} /> Deal Velocity</h3>
                    <p className="text-sm text-zinc-400 mb-4">Deal <strong>"Project X"</strong> is stalled in "Proposal" for &gt;14 days. Recommend scheduling a demo.</p>
                    <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg text-sm font-bold w-full transition-colors border border-purple-500/20">
                        Schedule Meeting
                    </button>
                </div>
            </div>

            {/* AI Assistant Chat (Mock) */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Daily Briefing</h3>
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-white/5 text-sm text-zinc-300 leading-relaxed font-mono">
                    <span className="text-purple-400 font-bold">{'>'} Summarizing key events...</span><br /><br />
                    • Revenue is trending <span className="text-green-400">up 15%</span> compared to last month.<br />
                    • You have <span className="text-yellow-400">3 overdue tasks</span> that require attention.<br />
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
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl lg:col-span-2 overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <h3 className="font-bold">Today's Tasks</h3>
                        <button className="text-zinc-500 hover:text-white"><Plus size={16} /></button>
                    </div>
                    <div className="divide-y divide-white/5">
                        {[
                            { title: "Review Q3 Report", time: "10:00 AM", priority: "High" },
                            { title: "Call with TechFlow", time: "11:30 AM", priority: "Medium" },
                            { title: "Update CRM records", time: "2:00 PM", priority: "Low" },
                            { title: "Team Sync", time: "4:00 PM", priority: "Medium" },
                        ].map((task, i) => (
                            <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/5 group">
                                <button className="w-5 h-5 rounded border border-zinc-600 group-hover:border-primary flex items-center justify-center text-transparent hover:text-primary transition-colors">
                                    <CheckSquare size={12} fill="currentColor" />
                                </button>
                                <div className="flex-1">
                                    <h4 className={`text-sm ${task.priority === 'High' ? 'text-white font-medium' : 'text-zinc-300'}`}>{task.title}</h4>
                                    <p className="text-xs text-zinc-500">{task.time}</p>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                                    task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-blue-500/10 text-blue-500'
                                    }`}>{task.priority}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calendar Preview */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Schedule</h3>
                        <Calendar size={16} className="text-zinc-500" />
                    </div>
                    {/* Mock Calendar Lines */}
                    <div className="space-y-3 relative">
                        <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-zinc-800"></div>
                        <EventCard time="09:00" title="Standup" duration="30m" color="bg-blue-500" />
                        <EventCard time="11:30" title="Client Call" duration="1h" color="bg-purple-500" />
                        <EventCard time="14:00" title="Deep Work" duration="2h" color="bg-zinc-700" />
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
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all relative ${active ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }`}
        >
            <Icon size={16} className={active ? "text-primary" : ""} />
            {label}
            {extra && <span className="text-[9px] bg-primary text-black px-1 rounded font-bold ml-1">{extra}</span>}
        </button>
    );
}

function TooltipTrigger({ text }: { text: string }) {
    if (!text) return null;
    return (
        <div className="group/tooltip relative flex items-center justify-center transform hover:scale-110 transition-transform">
            <Info size={12} className="text-zinc-500 hover:text-white cursor-help" />
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2.5 bg-[#1a1a1a] border border-zinc-700/50 rounded-xl shadow-2xl z-50 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity text-[10px] text-zinc-300 text-center leading-relaxed backdrop-blur-md">
                {text}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1a1a1a]"></div>
            </div>
        </div>
    );
}

function KpiCard({ label, value, change, isPositive, icon: Icon, color, text, tooltip }: any) {
    return (
        <motion.div variants={item} className={`relative p-4 rounded-xl border border-white/5 bg-gradient-to-br ${color} group`}>
            {/* Background Icon Layer - Clipped */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                    <Icon size={64} />
                </div>
            </div>

            {/* Content Layer - Not Clipped (for Tooltip) */}
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <Icon size={20} className={text} />
                        {tooltip && <TooltipTrigger text={tooltip} />}
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-black/20 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {change}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
                <p className="text-zinc-400 text-xs mt-1 font-medium">{label}</p>
            </div>
        </motion.div>
    );
}

function MiniStat({ label, value, tooltip }: any) {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4 flex items-center justify-between group">
            <div className="flex items-center gap-2">
                <span className="text-zinc-500 text-sm">{label}</span>
                {tooltip && <TooltipTrigger text={tooltip} />}
            </div>
            <span className="text-white font-bold font-mono">{value}</span>
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
            <div className="mt-1 min-w-[24px] h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 border border-white/5 group-hover:border-white/20 transition-colors">
                <Icon size={12} />
            </div>
            <div>
                <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">{title}</p>
                <p className="text-[10px] text-zinc-500">{user} • {time}</p>
            </div>
        </div>
    );
}

function FunnelBar({ label, count, color, width }: any) {
    return (
        <div className="relative h-8 flex items-center mb-1 group cursor-pointer">
            <div
                className={`h-full rounded-r-md flex items-center justify-between px-3 text-xs font-bold text-white shadow-md ${color} hover:brightness-110 transition-all`}
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
            <div className="text-[10px] text-zinc-500 font-mono pt-1 w-8 text-right">{time}</div>
            <div className={`flex-1 p-2 rounded border border-white/5 ${color}/20`}>
                <h4 className="text-xs font-bold text-white">{title}</h4>
                <p className="text-[10px] text-zinc-400">{duration}</p>
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
            backgroundColor: '#000',
            titleColor: '#fff',
            bodyColor: '#aaa',
            borderColor: '#333',
            borderWidth: 1
        }
    },
    scales: {
        x: { grid: { display: false, color: '#222' }, ticks: { color: '#666' } },
        y: { grid: { color: '#222' }, ticks: { color: '#666' } }
    }
};

function LineChartMock() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue',
                data: [65, 59, 80, 81, 56, 120],
                borderColor: '#eee8aa', // Primary cream color approx
                backgroundColor: 'rgba(238, 232, 170, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#000',
                pointBorderColor: '#eee8aa',
            },
            {
                label: 'Target',
                data: [70, 70, 75, 80, 85, 90],
                borderColor: '#444',
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
                backgroundColor: '#eee8aa',
            },
            {
                label: 'Bob',
                data: [35, 25, 15, 10, 8],
                backgroundColor: '#333',
            },
        ],
    };
    return <Bar options={chartOptions as any} data={data} />;
}
