'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { FaPlay, FaPause, FaRedo, FaCoffee, FaBriefcase } from 'react-icons/fa';

type TimerMode = 'work' | 'break';

export default function PomodoroPage() {
    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [progress, setProgress] = useState(100);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const totalTime = mode === 'work' ? 25 * 60 : 5 * 60;

    const tick = useCallback(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                // Timer finished
                setIsActive(false);
                // Can add audio notification here
                return 0;
            }
            return prev - 1;
        });
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(tick, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, tick]);

    useEffect(() => {
        setProgress((timeLeft / totalTime) * 100);
    }, [timeLeft, totalTime]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(totalTime);
        setProgress(100);
    };

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        const newTime = newMode === 'work' ? 25 * 60 : 5 * 60;
        setTimeLeft(newTime);
        setProgress(100);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Circular Progress Props
    const radius = 120;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white font-sans relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className={`w-[800px] h-[800px] rounded-full blur-[120px] absolute transition-colors duration-1000 ${mode === 'work' ? 'bg-red-600 -top-40 -right-40' : 'bg-green-600 -bottom-40 -left-40'}`}></div>
            </div>

            <div className="z-10 flex flex-col items-center gap-8 p-8">
                {/* Header / Mode Switcher */}
                <div className="flex bg-gray-900/50 p-1 rounded-full backdrop-blur-sm border border-gray-800">
                    <button
                        onClick={() => switchMode('work')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${mode === 'work'
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <FaBriefcase /> Work
                    </button>
                    <button
                        onClick={() => switchMode('break')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${mode === 'break'
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <FaCoffee /> Break
                    </button>
                </div>

                {/* Main Timer Display */}
                <div className="relative group">
                    {/* SVG Circle */}
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90 pointer-events-none"
                    >
                        <circle
                            stroke={mode === 'work' ? '#374151' : '#374151'}
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        <circle
                            stroke={mode === 'work' ? '#ef4444' : '#22c55e'}
                            strokeWidth={stroke}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s linear' }}
                            strokeLinecap="round"
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                    </svg>

                    {/* Time Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-6xl font-bold font-mono tracking-tighter">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="text-gray-400 mt-2 uppercase tracking-widest text-sm">
                            {isActive ? 'Running' : 'Paused'}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-4">
                    <button
                        onClick={toggleTimer}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all ${isActive
                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                            : mode === 'work'
                                ? 'bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/40'
                                : 'bg-green-500 text-white hover:bg-green-400 shadow-lg shadow-green-500/40'
                            }`}
                    >
                        {isActive ? <FaPause /> : <FaPlay className="ml-1" />}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="w-16 h-16 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white flex items-center justify-center text-xl transition-all"
                    >
                        <FaRedo />
                    </button>
                </div>
            </div>

            <div className="mt-12 z-10">
                <Link
                    href="/tools"
                    className="px-6 py-2 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-all rounded"
                >
                    ← Back to Tools
                </Link>
            </div>
        </div>
    );
}
