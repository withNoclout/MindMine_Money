"use client";

import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface VideoSectionProps {
    videoUrl: string;
}

export function VideoSection({ videoUrl }: VideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-1">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                <h2 className="text-2xl font-semibold text-white">Video Walkthrough</h2>
            </div>

            <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm shadow-2xl">
                {/* Video Element */}
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full aspect-video bg-black object-contain cursor-pointer"
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                />

                {/* Custom Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-6">
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/20 rounded-full mb-4 pointer-events-auto cursor-pointer overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={togglePlay}
                                className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
                            >
                                {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                            </button>

                            <button
                                onClick={() => {
                                    if (videoRef.current) {
                                        videoRef.current.muted = !isMuted;
                                        setIsMuted(!isMuted);
                                    }
                                }}
                                className="text-white hover:text-green-400"
                            >
                                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </button>
                        </div>

                        <button
                            onClick={() => videoRef.current?.requestFullscreen()}
                            className="text-white hover:text-green-400"
                        >
                            <Maximize className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Big Play Button (Centered when paused) */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
