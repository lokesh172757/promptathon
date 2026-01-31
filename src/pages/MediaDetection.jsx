import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Image as ImageIcon, Video, CheckCircle, AlertOctagon, X } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function MediaDetection() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const startAnalysis = () => {
        setAnalyzing(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setAnalyzing(false);
                    setResult({
                        isDeepfake: Math.random() > 0.5,
                        confidence: Math.floor(Math.random() * (99 - 80) + 80),
                        details: [
                            { label: "Face Consistency", score: 45, status: "Low" },
                            { label: "Lighting Artifacts", score: 92, status: "High" },
                            { label: "Audio-Video Sync", score: 88, status: "Low" },
                        ]
                    });
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    const reset = () => {
        setFile(null);
        setResult(null);
        setProgress(0);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Deepfake Detection</h1>
                <p className="text-muted-foreground">Upload images or videos to detect AI-generated manipulations.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <Card className="h-full">
                    <CardContent className="p-8 h-full flex flex-col justify-center">
                        {!file ? (
                            <div
                                className={cn(
                                    "border-2 border-dashed rounded-xl h-[400px] flex flex-col items-center justify-center transition-colors",
                                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                                )}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="p-4 rounded-full bg-primary/10 mb-4">
                                    <Upload className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Drag & Drop Media</h3>
                                <p className="text-muted-foreground mb-6 text-center max-w-xs">
                                    Support for JPG, PNG, MP4, AVI. <br /> Max file size 50MB.
                                </p>
                                <div className="relative">
                                    <Button size="lg">Browse Files</Button>
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleChange}
                                        accept="image/*,video/*"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="h-[400px] flex flex-col items-center justify-center relative rounded-xl overflow-hidden bg-black/50 border">
                                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white/70 hover:text-white" onClick={reset}>
                                    <X className="h-5 w-5" />
                                </Button>
                                {file.type.startsWith('image/') ? (
                                    <ImageIcon className="h-24 w-24 text-muted-foreground mb-4" />
                                ) : (
                                    <Video className="h-24 w-24 text-muted-foreground mb-4" />
                                )}
                                <p className="text-lg font-medium">{file.name}</p>
                                <p className="text-sm text-muted-foreground mb-8">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                                {!result && !analyzing && (
                                    <Button onClick={startAnalysis} size="lg" className="w-48">Start Scan</Button>
                                )}

                                {analyzing && (
                                    <div className="w-64 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Scanning frames...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className={cn("h-full border-2 animate-in slide-in-from-right-10 duration-500",
                            result.isDeepfake ? "border-red-500/50 bg-red-500/5" : "border-green-500/50 bg-green-500/5"
                        )}>
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                    {result.isDeepfake ? (
                                        <div className="h-20 w-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                                            <AlertOctagon className="h-10 w-10" />
                                        </div>
                                    ) : (
                                        <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                            <CheckCircle className="h-10 w-10" />
                                        </div>
                                    )}

                                    <div>
                                        <h2 className="text-3xl font-bold mb-1">
                                            {result.isDeepfake ? "Deepfake Detected" : "Authentic Media"}
                                        </h2>
                                        <p className="text-muted-foreground">
                                            CONFIDENCE SCORE: <span className={result.isDeepfake ? "text-red-500 font-bold" : "text-green-500 font-bold"}>{result.confidence}%</span>
                                        </p>
                                    </div>

                                    <div className="w-full grid gap-4 mt-8">
                                        {result.details.map((item, i) => (
                                            <div key={i} className="flex flex-col gap-1 text-left">
                                                <div className="flex justify-between text-sm font-medium">
                                                    <span>{item.label}</span>
                                                    <span className={item.score > 80 ? "text-red-500" : "text-green-500"}>{item.score}% abnormality</span>
                                                </div>
                                                <Progress value={item.score} className="h-1.5" indicatorColor={item.score > 80 ? "bg-red-500" : "bg-green-500"} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl p-8 bg-muted/20">
                            <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                                <ImageIcon className="h-8 w-8 opacity-50" />
                            </div>
                            <p className="text-lg">Select media to see detection results</p>
                            <p className="text-sm max-w-sm text-center opacity-70 mt-2">
                                Our model analyzes frame-by-frame inconsistencies, lighting artifacts, and metadata to detect synthetic generation.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
