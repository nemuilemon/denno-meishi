'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { FaPlay, FaPause, FaRedo, FaArrowUp, FaArrowDown } from 'react-icons/fa';

type TimerMode = 'countdown' | 'countup';

export default function TimerPage() {
    const [mode, setMode] = useState<TimerMode>('countdown');
    const [time, setTime] = useState(180); // countdown:残り時間, countup:経過時間
    const [initialTime, setInitialTime] = useState(180); // countdown用
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const tick = useCallback(() => {
        setTime((prev) => {
            if (mode === 'countdown') {
                if (prev <= 0) {
                    setIsActive(false);
                    return 0;
                }
                return prev - 1;
            } else {
                // countup
                return prev + 1;
            }
        });
    }, [mode]);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(tick, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, tick]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'countdown') {
            setTime(initialTime);
        } else {
            setTime(0);
        }
    };

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        if (newMode === 'countdown') {
            setTime(initialTime);
        } else {
            setTime(0);
        }
    };

    const adjustTime = (seconds: number) => {
        if (isActive || mode === 'countup') return;
        const newTime = Math.max(0, time + seconds);
        setTime(newTime);
        setInitialTime(newTime);
    };

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Calculate progress for circle
    let progress = 0;
    if (mode === 'countdown') {
        progress = initialTime > 0 ? (time / initialTime) * 100 : 0;
    } else {
        // Countup: 60秒で1周するアニメーションにする
        progress = ((time % 60) / 60) * 100;
    }

    // Countupの場合は時計回りに増えるように見せたいので反転しない（あるいはDashoffset計算で調整）
    // Countdown: 時間が減るとprogressが減る -> strokeが減る
    // Countup: 時間が増えるとprogressが増る -> strokeが増える

    // SVG設定
    const radius = 140;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    // Countdown: progress 100 -> 0 (Full -> Empty)
    // Countup: progress 0 -> 100 (Empty -> Full) per minute

    const strokeDashoffset = mode === 'countdown'
        ? circumference - (progress / 100) * circumference
        : circumference - (progress / 100) * circumference;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white font-sans relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className={`w-[600px] h-[600px] rounded-full blur-[120px] absolute transition-all duration-1000 ${mode === 'countdown' ? 'bg-cyan-600 -top-40 -left-40' : 'bg-purple-600 -bottom-40 -right-40'
                    }`}></div>
            </div>

            <div className="z-10 flex flex-col items-center gap-8 p-8 w-full max-w-2xl">

                {/* Mode Switcher */}
                <div className="flex bg-gray-900/50 p-1 rounded-full backdrop-blur-sm border border-gray-800 mb-4">
                    <button
                        onClick={() => switchMode('countdown')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${mode === 'countdown'
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <FaArrowDown /> Count Down
                    </button>
                    <button
                        onClick={() => switchMode('countup')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${mode === 'countup'
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <FaArrowUp /> Count Up
                    </button>
                </div>

                {/* Timer Display with SVG Circle */}
                <div className="relative group">
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90 pointer-events-none drop-shadow-2xl"
                    >
                        <circle
                            stroke="#1f2937"
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        <circle
                            stroke={mode === 'countdown' ? '#06b6d4' : '#9333ea'} // cyan or purple
                            strokeWidth={stroke}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear' }}
                            strokeLinecap="round"
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                            className={mode === 'countdown' && time === 0 ? 'opacity-0' : 'opacity-100'}
                        />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                        {/* Display Time */}
                        <div className={`font-bold font-mono tracking-tighter transition-all ${time > 3600 ? 'text-6xl md:text-7xl' : 'text-7xl md:text-8xl'
                            } ${mode === 'countdown' && time === 0 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                            {formatTime(time)}
                        </div>

                        {/* Status Label */}
                        <div className={`mt-4 uppercase tracking-[0.2em] text-sm font-medium ${mode === 'countdown' ? 'text-cyan-400' : 'text-purple-400'}`}>
                            {mode === 'countdown' && time === 0 ? 'Time Up!' : isActive ? 'Running' : 'Ready'}
                        </div>
                    </div>
                </div>

                {/* Adjust Controls (Only for Countdown and when paused) */}
                <div className={`transition-all duration-300 ${mode === 'countdown' && !isActive ? 'opacity-100 h-auto' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`}>
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                        <div className="flex flex-col gap-2">
                            <button onClick={() => adjustTime(60)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-cyan-300 font-bold transition-colors">+1 min</button>
                            <button onClick={() => adjustTime(-60)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">-1 min</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => adjustTime(300)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-cyan-300 font-bold transition-colors">+5 min</button>
                            <button onClick={() => adjustTime(-300)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">-5 min</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => adjustTime(10)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-cyan-300 font-bold transition-colors">+10 sec</button>
                            <button onClick={() => adjustTime(-10)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">-10 sec</button>
                        </div>
                    </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTimer}
                        disabled={mode === 'countdown' && time === 0 && !isActive}
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-all transform active:scale-95 shadow-lg ${isActive
                                ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                                : mode === 'countdown'
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/50'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-purple-500/50'
                            }`}
                    >
                        {isActive ? <FaPause /> : <FaPlay className="ml-1" />}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="w-14 h-14 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white flex items-center justify-center text-lg transition-all border border-gray-700"
                    >
                        <FaRedo />
                    </button>
                </div>
            </div>

            <div className="mt-8 z-10 text-center">
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
