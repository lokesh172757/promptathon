import React from 'react';
import { cn } from "@/lib/utils";

export default function Logo({ className, showText = true, centered = false }) {
    return (
        <div className={cn("flex", centered ? "flex-col items-center justify-center gap-2" : "flex-row items-center gap-3", className)}>
            {showText && (
                <div className={cn("flex flex-col", centered ? "items-center text-center" : "items-end")}>
                    <span className={cn("font-bold tracking-tight text-white leading-none font-sans drop-shadow-md", centered ? "text-5xl" : "text-2xl")}>
                        Truth<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Lens</span>
                    </span>
                    <span className={cn("uppercase tracking-[0.3em] text-cyan-500/70 font-semibold", centered ? "text-xs mt-2" : "text-[8px] mt-0.5")}>
                        Verify Reality
                    </span>
                </div>
            )}

            <div className={cn("relative flex items-center justify-center", centered ? "h-20 w-20" : "h-10 w-10")}>
                {/* Animated Rings */}
                <div className="absolute inset-0 border-2 border-cyan-500/50 rounded-full animate-[ping_3s_linear_infinite]" />
                <div className="absolute inset-1 border border-blue-500/30 rounded-full" />

                {/* Core Eye/Lens */}
                <div className={cn("relative bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center overflow-hidden", centered ? "h-10 w-10" : "h-6 w-6")}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                    <div className="h-3 w-3 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.9)] animate-pulse" />
                </div>
            </div>
        </div>
    );
}
