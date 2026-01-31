import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Globe, Radio } from 'lucide-react';
import { cn } from "@/lib/utils";

const generateHotspots = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        intensity: Math.random(),
        size: Math.random() * 20 + 10,
        type: Math.random() > 0.7 ? 'botfarm' : 'misinfo'
    }));
};

export default function RealtimeMap() {
    const [hotspots, setHotspots] = useState([]);

    useEffect(() => {
        setHotspots(generateHotspots(20));
        const interval = setInterval(() => {
            setHotspots(prev => prev.map(h => ({
                ...h,
                intensity: Math.random(),
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <Radio className="h-6 w-6 text-red-500 animate-pulse" /> Live Threat Map
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                        Monitoring global information vectors.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30">
                        {hotspots.filter(h => h.type === 'botfarm').length} Bot Farms
                    </Badge>
                    <Badge variant="outline" className="border-teal-500/30 text-teal-400">
                        {(hotspots.length * 124).toLocaleString()} Vectors Analyzed
                    </Badge>
                </div>
            </div>

            <Card className="flex-1 relative overflow-hidden bg-[#050B14] border-cyan-900/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {/* Cyber Grid Background */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* World Map Silhouette */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    {/* Abstract continent shapes using CSS gradients */}
                    <div className="absolute top-[20%] left-[20%] w-[20%] h-[30%] bg-gradient-to-br from-cyan-600 to-transparent rounded-full blur-3xl opacity-40" />
                    <div className="absolute top-[30%] right-[30%] w-[30%] h-[20%] bg-gradient-to-bl from-blue-700 to-transparent rounded-full blur-3xl opacity-40" />
                </div>

                {/* Hotspots */}
                {hotspots.map((spot) => (
                    <div
                        key={spot.id}
                        className="absolute rounded-full transition-all duration-1000 ease-in-out cursor-pointer group"
                        style={{
                            left: `${spot.x}%`,
                            top: `${spot.y}%`,
                            width: `${spot.size}px`,
                            height: `${spot.size}px`,
                            backgroundColor: spot.type === 'botfarm'
                                ? `rgba(239, 68, 68, ${spot.intensity * 0.4})` // Red for Botfarm
                                : `rgba(234, 179, 8, ${spot.intensity * 0.4})`, // Yellow for Misinfo
                            boxShadow: spot.type === 'botfarm'
                                ? `0 0 ${spot.intensity * 30}px rgba(239, 68, 68, 0.6)`
                                : `0 0 ${spot.intensity * 30}px rgba(234, 179, 8, 0.6)`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Core */}
                        <div className={cn("absolute inset-[30%] rounded-full animate-bounce",
                            spot.type === 'botfarm' ? "bg-red-500" : "bg-yellow-400"
                        )} />

                        {/* Ping Ring */}
                        <div className={cn("absolute inset-0 rounded-full border animate-ping opacity-40",
                            spot.type === 'botfarm' ? "border-red-500" : "border-yellow-400"
                        )} />

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-black/80 backdrop-blur-md text-white text-xs p-3 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl transform group-hover:-translate-y-2 duration-200">
                            <div className="font-bold flex items-center gap-2 mb-1 text-sm">
                                <AlertCircle className={cn("h-4 w-4", spot.type === 'botfarm' ? "text-red-500" : "text-yellow-500")} />
                                {spot.type === 'botfarm' ? "Automated Bot Farm" : "Viral Misinformation"}
                            </div>
                            <div className="space-y-1 text-gray-400">
                                <div className="flex justify-between">
                                    <span>Severity:</span>
                                    <span className="text-white">Critical</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Origin:</span>
                                    <span className="text-white">Masked IP ({Math.floor(spot.x)}, {Math.floor(spot.y)})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
}
