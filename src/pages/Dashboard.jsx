import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShieldAlert, ShieldCheck, Users, Globe, ExternalLink } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [stats, setStats] = useState({ verified: 0, threats: 0, deepfakes: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:8000/dashboard/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
        // Poll every 30s
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    // Placeholder data for the chart (Visualization only - kept for UI aesthetic as real history chart is complex)
    const chartData = [
        { name: 'Mon', attempts: 400, blocked: 240 },
        { name: 'Tue', attempts: 300, blocked: 139 },
        { name: 'Wed', attempts: 200, blocked: 980 },
        { name: 'Thu', attempts: 278, blocked: 390 },
        { name: 'Fri', attempts: 189, blocked: 480 },
        { name: 'Sat', attempts: 239, blocked: 380 },
        { name: 'Sun', attempts: 349, blocked: 430 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Global Overwatch</h2>
                <p className="text-muted-foreground">Real-time threat intelligence and system metrics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Verified"
                    value={loading ? "..." : stats.verified.toLocaleString()}
                    icon={ShieldCheck}
                    desc="+12% from last week"
                    color="text-emerald-400"
                />
                <StatsCard
                    title="Threats Blocked"
                    value={loading ? "..." : stats.threats.toLocaleString()}
                    icon={ShieldAlert}
                    desc="High priority alerts"
                    color="text-red-400"
                />
                <StatsCard
                    title="Deepfakes Detected"
                    value={loading ? "..." : stats.deepfakes.toLocaleString()}
                    icon={Activity}
                    desc="Media manipulation"
                    color="text-orange-400"
                />
                <StatsCard
                    title="Active Nodes"
                    value="1,204"
                    icon={Globe}
                    desc="Global server uptime"
                    color="text-blue-400"
                />
            </div>

            {/* Main Chart Section */}
            <div className="grid gap-4 md:grid-cols-7">
                <Card className="col-span-4 border-white/5 bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                        <CardTitle>Infiltration Attempts</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorAttempts" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#888" />
                                    <YAxis stroke="#888" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #333' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="attempts" stroke="#f43f5e" fillOpacity={1} fill="url(#colorAttempts)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Live Feed */}
                <Card className="col-span-3 border-white/5 bg-black/20">
                    <CardHeader>
                        <CardTitle>Threat Stream</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            <FeedItem title="Deepfake detected in APAC Region" time="2m ago" level="critical" />
                            <FeedItem title="Botnet originating from Eastern Europe" time="15m ago" level="warning" />
                            <FeedItem title="Phishing campaign neutralized" time="1h ago" level="success" />
                            <FeedItem title="New verified source added: Reuters" time="3h ago" level="neural" />
                            <FeedItem title="Anomalous traffic spike detected" time="5h ago" level="warning" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, desc, color }) {
    return (
        <Card className="border-white/5 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </CardContent>
        </Card>
    )
}

function FeedItem({ title, time, level }) {
    const colors = {
        critical: 'bg-red-500/10 text-red-400 border-red-500/20',
        warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        success: 'bg-green-500/10 text-green-400 border-green-500/20',
        neural: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    };

    return (
        <div className={`p-3 rounded-lg border ${colors[level]} flex items-start justify-between`}>
            <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-[10px] opacity-70 mt-1">Source: Neural Network Node 4</p>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{time}</span>
        </div>
    )
}
