import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Brain, Activity, History, MapPin, Paperclip, FileText, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm TruthLens AI. Upload media or text to detect manipulation.", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('General');
    const messagesEndRef = useRef(null);

    const topics = ['Politics', 'Health', 'Finance', 'Conflict', 'Science'];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);
        const textToSend = input;
        setInput('');

        try {
            const response = await fetch('http://localhost:8000/analyze/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'text',
                    text: textToSend
                })
            });

            const data = await response.json();

            setIsTyping(false);
            const analysisResponse = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `Analysis: ${data.summary}`,
                analysis: data.psychological
            };
            setMessages(prev => [...prev, analysisResponse]);

        } catch (e) {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "Error connecting to TruthLens Neural Cloud." }]);
        }
    };

    const handleSummarize = () => {
        // Future: Connect to /summarize endpoint
        setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'ai',
            text: "Summarization module requires text input. Please send an article first."
        }]);
    }

    return (
        <>
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] bg-gradient-to-tr from-cyan-500 to-blue-600 hover:scale-105 transition-all z-50 p-0 border border-white/10"
                >
                    <MessageSquare className="h-7 w-7 text-white" />
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping" />
                </Button>
            )}

            {isOpen && (
                <Card className="fixed bottom-6 right-6 w-[350px] sm:w-[420px] h-[600px] shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-20 duration-300 border-primary/30 bg-[#050B14]/95 backdrop-blur-xl">
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-full border border-primary/30">
                                <Brain className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Psych-Ops Analyzer</span>
                                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Wrapper for scrollable area */}
                    <div className="flex-1 overflow-hidden flex flex-col">

                        {/* Topic Filters */}
                        <div className="p-2 flex gap-2 overflow-x-auto border-b border-white/5 bg-black/20 no-scrollbar">
                            {topics.map(topic => (
                                <Badge
                                    key={topic}
                                    variant={selectedTopic === topic ? "default" : "outline"}
                                    className={cn("cursor-pointer whitespace-nowrap", selectedTopic === topic ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50" : "text-slate-400 border-white/10")}
                                    onClick={() => setSelectedTopic(topic)}
                                >
                                    {topic}
                                </Badge>
                            ))}
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex flex-col gap-1", msg.sender === 'user' ? "items-end" : "items-start")}>
                                    <div
                                        className={cn(
                                            "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md",
                                            msg.sender === 'user'
                                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                : "bg-secondary/50 border border-white/5 text-secondary-foreground rounded-tl-sm backdrop-blur-md"
                                        )}
                                    >
                                        {msg.text}
                                    </div>

                                    {/* AI Analysis Cards */}
                                    {msg.analysis && (
                                        <div className="w-[90%] mt-2 space-y-3 animate-in fade-in duration-500">
                                            {/* Psychological Impact */}
                                            <div className="bg-black/40 rounded-lg p-3 border border-white/5 space-y-3">
                                                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                                                    <Activity className="h-3 w-3" /> Emotional Triggers
                                                </div>
                                                <div className="space-y-2">
                                                    <ImpactMeter label="Fear" value={msg.analysis.fear} color="text-purple-400" barColor="bg-purple-500" />
                                                    <ImpactMeter label="Anger" value={msg.analysis.anger} color="text-red-400" barColor="bg-red-500" />
                                                    <ImpactMeter label="Urgency" value={msg.analysis.urgency} color="text-orange-400" barColor="bg-orange-500" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center gap-2 text-muted-foreground text-xs ml-4">
                                    <Bot className="h-3 w-3 animate-bounce" /> Analyzing patterns...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-white/5 bg-black/20 backdrop-blur-md space-y-2">
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-9 w-9 border-white/10 hover:bg-white/10" title="Attach Media">
                                <Paperclip className="h-4 w-4 text-slate-400" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-9 border-white/10 hover:bg-white/10 text-xs text-slate-400" onClick={handleSummarize}>
                                <FileText className="h-3 w-3 mr-1" /> Summarize
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Paste text or URL..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 bg-secondary/30 border-white/10 focus-visible:ring-cyan-500"
                            />
                            <Button size="icon" onClick={handleSend} disabled={!input.trim()} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
}

function ImpactMeter({ label, value, color, barColor }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs">
                <span className="text-gray-300">{label}</span>
                <span className={cn("font-bold", color)}>{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000", barColor)}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    )
}
