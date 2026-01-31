import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Map, Image as ImageIcon, Menu, Bell, Search, LogOut, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AIChatbot from "./AIChatbot";
import { useAuth } from '@/context/AuthContext';
import { Card } from "@/components/ui/card";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-card/50 backdrop-blur-xl border-r border-border transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col",
                    !sidebarOpen && "-translate-x-full md:w-[70px]"
                )}
            >
                <div className="h-16 flex items-center px-4 border-b border-border/40">
                    <div className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <div className="h-3 w-3 bg-primary rounded-full animate-pulse" />
                        </div>
                        {sidebarOpen && <span className="tracking-tight">TruthLens</span>}
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" expanded={sidebarOpen} end />
                    <NavItem to="/dashboard/verify" icon={FileText} label="Verify News" expanded={sidebarOpen} />
                    <NavItem to="/dashboard/media" icon={ImageIcon} label="Media Detection" expanded={sidebarOpen} />
                    <NavItem to="/dashboard/map" icon={Map} label="Global Map" expanded={sidebarOpen} />
                </nav>

                <div className="p-4 border-t border-border/40">
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20", !sidebarOpen && "justify-center px-0")}
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5 mr-2" />
                        {sidebarOpen && "Logout"}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-16 border-b border-border/40 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 z-40">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="relative hidden md:block w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search detections, URLs, or topics..."
                                className="pl-9 bg-secondary/50 border-white/5 focus-visible:ring-primary/50 transition-all focus:w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Button variant="ghost" size="icon" className="relative" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                            </Button>

                            {/* Notifications Popover */}
                            {notificationsOpen && (
                                <Card className="absolute right-0 top-full mt-2 w-80 bg-[#0A192F] border-white/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-3 border-b border-white/5 flex justify-between items-center">
                                        <h4 className="font-semibold text-sm">Notifications</h4>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setNotificationsOpen(false)}>
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0">
                                                <p className="text-xs font-medium text-white">Deepfake Alert: CEO Voice Clone</p>
                                                <p className="text-[10px] text-muted-foreground mt-1">Detected across 40 nodes in APAC region.</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}
                        </div>

                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg cursor-pointer hover:ring-2 ring-white/20 transition-all">
                            {user?.name?.[0] || 'U'}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-6 scroll-smooth">
                    <Outlet />
                </div>

                <AIChatbot />
            </main>
        </div>
    );
}

function NavItem({ to, icon: Icon, label, expanded, end }) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                    ? "bg-primary/20 text-primary shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
        >
            <Icon className="h-5 w-5 shrink-0" />
            {expanded && <span className="font-medium whitespace-nowrap overflow-hidden transition-all">{label}</span>}

            {/* Tooltip for collapsed state */}
            {!expanded && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-white/10">
                    {label}
                </div>
            )}
        </NavLink>
    )
}
