'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// --- Data types
type Metric = {
    title: string;
    value: string | number;
    change?: string;
    subtitle?: string;
    icon?: string;
};

type QuickStat = {
    label: string;
    value: string;
    status?: 'success' | 'info' | 'warn' | 'error';
};

type ActivityItem = {
    id: string;
    title: string;
    timeago: string;
    kind: 'User' | 'System' | 'Error' | 'Alert';
    icon?: string;
};

// --- Reusable UI parts
const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div
        aria-hidden="true"
        className={`animate-pulse bg-slate-800 border border-slate-700 rounded ${className ?? ''}`}
        style={{ minHeight: '2rem' }}
    />
);

const Pill: React.FC<{ tone?: 'green' | 'red' | 'blue' | 'slate'; children: React.ReactNode }> = ({
    tone = 'slate',
    children,
}) => {
    const toneMap: Record<string, React.CSSProperties> = {
        green: { background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' },
        red: { background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' },
        blue: { background: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.25)' },
        slate: { background: 'rgba(148,163,184,0.12)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.25)' },
    };
    return (
        <span
            className="rounded"
            style={{
                ...toneMap[tone],
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '999px',
                display: 'inline-block',
            }}
        >
            {children}
        </span>
    );
};

const Card: React.FC<{ title?: string; subtitle?: string; headerRight?: React.ReactNode; children: React.ReactNode }> = ({
    title,
    subtitle,
    headerRight,
    children,
}) => (
    <section className="bg-slate-800 rounded-xl border border-slate-700" aria-label={title}>
        {(title || subtitle || headerRight) && (
            <header className="p-6 border-b border-slate-700 flex items-center justify-between">
                <div>
                    {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
                    {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
                </div>
                {headerRight}
            </header>
        )}
        <div className="p-6">{children}</div>
    </section>
);

// --- Main dashboard
const AnalyticsDashboard: React.FC = () => {
    const [now, setNow] = useState<string>(() => new Date().toLocaleTimeString());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t1 = setTimeout(() => setLoading(false), 600);
        const t2 = setInterval(() => setNow(new Date().toLocaleTimeString()), 1000);
        return () => {
            clearTimeout(t1);
            clearInterval(t2);
        };
    }, []);

    const metrics: Metric[] = useMemo(
        () => [
            { title: 'Active Users', value: loading ? '—' : '1,247', change: '+12%', subtitle: 'Real-time connected', icon: '👥' },
            { title: 'Total Events', value: loading ? '—' : '24,820', change: '+8%', subtitle: 'This month', icon: '📊' },
            { title: 'Event Types', value: loading ? '—' : '12', change: '+2', subtitle: 'Categories', icon: '🔧' },
            { title: 'Response Time', value: loading ? '—' : '86ms', change: '-5%', subtitle: 'Average', icon: '⚡' },
        ],
        [loading],
    );

    const quickStats: QuickStat[] = useMemo(
        () => [
            { label: 'WebSocket', value: 'Connected', status: 'success' },
            { label: 'Data Updates', value: 'Real-time', status: 'success' },
            { label: 'Last Sync', value: now, status: 'info' },
        ],
        [now],
    );

    const activity: ActivityItem[] = useMemo(
        () => [
            { id: 'a1', title: 'New user registered', timeago: '2 minutes ago', kind: 'User', icon: '🆕' },
            { id: 'a2', title: 'Plan upgraded to Pro', timeago: '8 minutes ago', kind: 'System', icon: '⬆️' },
            { id: 'a3', title: 'Spike in 500 errors', timeago: '12 minutes ago', kind: 'Error', icon: '❗' },
            { id: 'a4', title: 'Webhook delivered', timeago: '15 minutes ago', kind: 'Alert', icon: '🔔' },
        ],
        [],
    );

    // --- Chart data for Analytics Overview
    const chartData = [
        { name: 'Mon', value: 400 },
        { name: 'Tue', value: 300 },
        { name: 'Wed', value: 500 },
        { name: 'Thu', value: 200 },
        { name: 'Fri', value: 350 },
        { name: 'Sat', value: 420 },
        { name: 'Sun', value: 480 },
    ];

    return (
        <div className="min-h-screen" role="main" aria-label="Analytics dashboard">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700 px-8 py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                        <p className="text-slate-400 mt-1">Real-time insights and performance metrics</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-green-900/30 px-3 py-2 rounded">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-400 text-sm font-medium">Live</span>
                        </div>
                        <button
                            className="rounded bg-slate-800 border border-slate-700 px-4 py-2 text-white hover:bg-slate-700 transition-colors"
                            onClick={() => { /* hook up to your exporter */ }}
                        >
                            Export Report
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="p-8">
                {/* Top metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" role="region" aria-label="Key metrics">
                    {metrics.map((m, i) => (
                        <section
                            key={i}
                            className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-slate-900 rounded flex items-center justify-center">
                                    <span className="text-2xl" aria-hidden="true">
                                        {m.icon ?? '📈'}
                                    </span>
                                </div>
                                {m.change && <Pill tone={m.change.startsWith('+') ? 'green' : 'red'}>{m.change}</Pill>}
                            </div>
                            <h3 className="text-slate-400 text-sm font-medium mb-2">{m.title}</h3>
                            <div className="text-3xl font-bold text-white mb-1">{loading ? <Skeleton className="h-8" /> : m.value}</div>
                            <p className="text-slate-500 text-sm">{m.subtitle}</p>
                        </section>
                    ))}
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left: Overview + Activity */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* --- Chart section with Recharts --- */}
                        <Card
                            title="Analytics Overview"
                            subtitle="Events trend this week"
                            headerRight={
                                <select
                                    aria-label="Time range"
                                    className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white"
                                    defaultValue="7"
                                >
                                    <option value="7">Last 7 days</option>
                                    <option value="30">Last 30 days</option>
                                    <option value="90">Last 90 days</option>
                                </select>
                            }
                        >
                            <div className="h-64 bg-slate-900 rounded border border-slate-700 p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <XAxis dataKey="name" stroke="#94a3b8" />
                                        <YAxis stroke="#94a3b8" />
                                        <Tooltip
                                            contentStyle={{
                                                background: '#1e293b',
                                                border: '1px solid #334155',
                                                color: '#fff',
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#7c3aed"
                                            strokeWidth={3}
                                            dot={{ r: 3 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        <Card title="Recent Activity">
                            <div className="space-y-3">
                                {activity.map((a) => (
                                    <div
                                        key={a.id}
                                        className="flex items-center justify-between p-4 bg-slate-900 rounded border border-slate-700"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center">
                                                <span aria-hidden="true">{a.icon ?? '🔔'}</span>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{a.title}</p>
                                                <p className="text-slate-500 text-sm">{a.timeago}</p>
                                            </div>
                                        </div>
                                        <Pill tone={a.kind === 'Error' ? 'red' : a.kind === 'User' ? 'green' : 'blue'}>
                                            {a.kind}
                                        </Pill>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right: Status + AI + Active users */}
                    <div className="space-y-8">
                        <Card title="System Status">
                            <div className="space-y-4">
                                {quickStats.map((s, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center py-3 border-b border-slate-700 last:border-0"
                                    >
                                        <span className="text-slate-400">{s.label}</span>
                                        <span
                                            className={`font-medium ${s.status === 'success'
                                                    ? 'text-green-400'
                                                    : s.status === 'error'
                                                        ? 'text-red-400'
                                                        : s.status === 'warn'
                                                            ? 'text-white'
                                                            : 'text-slate-300'
                                                }`}
                                        >
                                            {s.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card title="AI Insights" subtitle="Automatically generated suggestions">
                            <div className="space-y-4">
                                <div className="bg-slate-900 rounded p-4 border border-slate-700">
                                    <p className="text-white font-semibold mb-1">Traffic Pattern Detected</p>
                                    <p className="text-slate-400 text-sm">
                                        Peak activity between 14:00–16:00. Consider scaling resources.
                                    </p>
                                </div>
                                <div className="bg-slate-900 rounded p-4 border border-slate-700">
                                    <p className="text-white font-semibold mb-1">Performance Tip</p>
                                    <p className="text-slate-400 text-sm">Response times improved by 15% this week.</p>
                                </div>
                            </div>
                        </Card>

                        <Card title="Active Users" subtitle="Currently online">
                            <div className="text-center py-6">
                                {loading ? (
                                    <Skeleton className="h-12" />
                                ) : (
                                    <div className="text-4xl font-bold text-white mb-2">1,247</div>
                                )}
                                <div className="mt-4 flex justify-center gap-1" aria-hidden="true">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="w-2 h-8 bg-slate-700 rounded-full animate-pulse"
                                            style={{ animationDelay: `${i * 80}ms` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
