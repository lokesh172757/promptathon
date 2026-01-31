import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from '@/components/Logo';
import { ArrowRight, ShieldCheck, Zap, Play } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function LandingPage() {
    const navigate = useNavigate();

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-cyan-500/30">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md transition-all duration-300">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Logo showText={true} className="flex-row gap-3 scale-90" centered={false} />
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => handleScroll('how-it-works')} className="hidden md:flex text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">How it Works</button>
                        <button onClick={() => handleScroll('features')} className="hidden md:flex text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Features</button>
                        <Button
                            onClick={() => navigate('/login')}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                        >
                            Launch Platform
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 md:pt-52 md:pb-48 overflow-hidden flex flex-col items-center justify-center text-center">
                {/* Animated Background Gradients */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-cyan-500/20 transition-colors cursor-crosshair">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        AI-Powered Disinformation Defense System
                    </div>

                    <div className="mb-12 flex justify-center scale-110">
                        <Logo centered={true} showText={true} />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Detect the Fake.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">Verify the Real.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed">
                        Advanced neural networks analyzing text, images, and video in real-time to protect against psychological operations and deepfakes.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Button
                            size="lg"
                            onClick={() => navigate('/login')}
                            className="h-14 px-10 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.4)] border border-white/20"
                        >
                            Analyze Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                            className="h-14 px-10 text-lg border-white/10 hover:bg-white/5 backdrop-blur-sm hover:border-cyan-500/50 transition-all"
                        >
                            <Play className="mr-2 h-5 w-5 fill-current" /> Watch Demo
                        </Button>
                    </div>
                </div>

                {/* Floating Elements (Decorative) - Re-positioned to look cleaner */}
                <div className="absolute top-[30%] left-[5%] md:left-[10%] animate-bounce delay-700 duration-[5000ms] hidden lg:block opacity-80 hover:opacity-100 transition-opacity">
                    <GlassCard icon={ShieldCheck} label="99.8% Accuracy" color="text-green-400" />
                </div>
                <div className="absolute top-[60%] right-[5%] md:right-[10%] animate-bounce delay-100 duration-[6000ms] hidden lg:block opacity-80 hover:opacity-100 transition-opacity">
                    <GlassCard icon={Zap} label="Latency < 50ms" color="text-yellow-400" />
                </div>
            </section>

            {/* 3D Features Section */}
            <section id="features" className="py-32 bg-[#020617] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Military-Grade</span> Verification
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Our proprietary engines check against global databases, sentiment patterns, and forensic markers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 perspective-1000">
                        <TiltCard
                            title="Deepfake Forensics"
                            desc="Frame-by-frame forensic analysis of video and audio tracks to detect synthetic manipulation and artifacting."
                            icon="🎥"
                            gradient="from-[#0f172a] to-[#1e293b]"
                            border="border-cyan-500/30"
                            glow="group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                        />
                        <TiltCard
                            title="Psychological Ops"
                            desc="NLU algorithms detect emotional triggers (Fear, Anger, Urgency) designed to manipulate public sentiment."
                            icon="🧠"
                            gradient="from-[#0f172a] to-[#1e293b]"
                            border="border-purple-500/30"
                            glow="group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                        />
                        <TiltCard
                            title="Global Threat Map"
                            desc="Real-time visual tracking of misinformation vectors and bot farm origins worldwide using geospatial analysis."
                            icon="🌍"
                            gradient="from-[#0f172a] to-[#1e293b]"
                            border="border-blue-500/30"
                            glow="group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 bg-black">
                <div className="container mx-auto px-6 text-center text-slate-500">
                    <Logo className="justify-center mb-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" centered={true} showText={false} />
                    <p>&copy; 2024 TruthLens AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function GlassCard({ icon: Icon, label, color }) {
    return (
        <div className="hidden md:flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl w-fit">
            <div className={cn("p-2 rounded-lg bg-black/30", color)}>
                <Icon className="h-5 w-5" />
            </div>
            <span className="font-semibold text-sm">{label}</span>
        </div>
    )
}

function TiltCard({ title, desc, icon, gradient, border, glow }) {
    const ref = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Increased tilt effect for more "3D" feel
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        setRotateX(rotateX);
        setRotateY(rotateY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div
            className="perspective-1000 group h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={ref}
                className={cn(
                    "relative h-full p-8 rounded-2xl border bg-gradient-to-br backdrop-blur-sm transition-transform duration-100 ease-out shadow-lg overflow-hidden",
                    gradient, border, glow
                )}
                style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: 'preserve-3d' }}
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />

                <div className="relative z-10 translate-z-10">
                    <div className="text-4xl mb-6 p-4 bg-black/40 rounded-full w-fit border border-white/5 shadow-inner">{icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
                </div>
            </div>
        </div>
    );
}
