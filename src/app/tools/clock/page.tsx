'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClockPage() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date()); // マウント時に時刻をセット
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // マウント前（サーバーサイド）は何も表示しない（ハイドレーションエラー防止）
    if (!time) return <div className="min-h-screen bg-black" />;

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-cyan-400 font-mono relative overflow-hidden">
            {/* 背景装飾（任意） */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 bg-cyan-500 rounded-full blur-3xl absolute -top-20 -left-20"></div>
                <div className="w-96 h-96 bg-purple-500 rounded-full blur-3xl absolute bottom-0 right-0"></div>
            </div>

            <div className="z-10 text-center space-y-4 p-8 border border-cyan-500/30 rounded-2xl bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <h2 className="text-xl md:text-2xl text-cyan-200 opacity-80 tracking-widest uppercase">
                    System Time
                </h2>

                <div className="text-6xl md:text-9xl font-bold tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                    {formatTime(time)}
                </div>

                <div className="text-lg md:text-2xl text-cyan-300 font-light">
                    {formatDate(time)}
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
