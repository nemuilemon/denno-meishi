'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function RoulettePage() {
    const [input, setInput] = useState<string>('1\n2\n3\n4\n5\n6');
    const [items, setItems] = useState<string[]>(['1', '2', '3', '4', '5', '6']);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);

    // Update items when input changes
    useEffect(() => {
        const newItems = input.split('\n').filter(item => item.trim() !== '');
        if (newItems.length > 0) {
            setItems(newItems);
        }
    }, [input]);

    const colors = useMemo(() => [
        '#ef4444', // red-500
        '#3b82f6', // blue-500
        '#22c55e', // green-500
        '#eab308', // yellow-500
        '#a855f7', // purple-500
        '#ec4899', // pink-500
        '#f97316', // orange-500
        '#06b6d4', // cyan-500
    ], []);

    const spin = () => {
        if (isSpinning || items.length === 0) return;

        setIsSpinning(true);
        setWinner(null);

        // Calculate random rotation: at least 5 full spins (1800 deg) + random segment
        const spinAngle = 1800 + Math.random() * 360;
        const newRotation = rotation + spinAngle;

        setRotation(newRotation);

        // Determine winner matching the visual rotation
        // The pointer is usually at top (270deg) or right (0deg). 
        // Let's assume pointer is at the TOP (270 degrees in standard circle math, or -90).
        // Actually, CSS rotate(0deg) puts 0 at the top if we orient it that way, or right.
        // Let's assume standard CSS: 0deg is upright if we setup SVG that way, or 0 is 3 o'clock.
        // Let's rely on the animation end to calculate the winner to be exact.

        setTimeout(() => {
            setIsSpinning(false);

            // Normalize rotation to 0-360
            const actualRotation = newRotation % 360;

            // If pointer is at top (let's say we rotate the WHEEL, pointer is static at top)
            // The item at the top is the one that lands at (360 - actualRotation) + offset
            // Let's do the math:
            // One segment size = 360 / N
            // If we rotate X degrees clockwise, the segment at 0 moves to X.
            // We want the segment that ends up at angle TOP (e.g. 270 or -90).

            // Simpler: Just map the final angle to the index.
            // If we rotate clockwise, indexes rotate.
            // visual angle = (start + rotation) % 360
            // index 0 starts at 0 (or wherever depending on rendering).

            // Let's define: Item 0 is at 0 degrees (3 o'clock). 
            // We rotate wheel CLOCKWISE.
            // Pointer is at 270 degrees (12 o'clock).
            // The winning slice is the one covering 270 degrees.

            // Position of slice `i`: [i * size, (i+1) * size]
            // After rotation `R`: [i*size + R, (i+1)*size + R]
            // We want `k` such that `k*size + R <= 270 < (k+1)*size + R` (modulo 360)
            // Actually, easier:
            // effective angle of pointer relative to wheel = (PointerPos - Rotation) % 360
            // PointerPoss = 270 (Top)
            // relativeAngle = (270 - actualRotation) % 360
            // if relativeAngle < 0, relativeAngle += 360

            // segmentIndex = floor(relativeAngle / segmentSize)

            const segmentAngle = 360 / items.length;
            const pointerAngle = 0; // Top (Index 0 starts at Top because of SVG -90deg rotation)
            let relativeAngle = (pointerAngle - actualRotation) % 360;
            if (relativeAngle < 0) relativeAngle += 360;

            const winningIndex = Math.floor(relativeAngle / segmentAngle);
            setWinner(items[winningIndex]);

        }, 5000); // 5 seconds duration
    };

    // Visualization helpers
    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 text-white overflow-hidden">
            {/* Left: Roulette */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">

                {/* Visual wrapper */}
                <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
                        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white drop-shadow-lg"></div>
                    </div>

                    {/* Wheel */}
                    <div
                        className="w-full h-full rounded-full border-4 border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-gray-900 transition-transform cubic-bezier(0.25, 0.1, 0.25, 1)"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transitionDuration: isSpinning ? '5s' : '0s',
                            transitionTimingFunction: 'cubic-bezier(0.1, 0.7, 0.1, 1)'
                        }}
                    >
                        <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }} className="w-full h-full">
                            {/* rotate(-90deg) so 0 deg starts at top, but our math assumed 0 at right. 
                                Wait, if we use standard SVG unit circle, 0 is at (1,0) [Right].
                                If we want 0 index to be at top visually, we should rotate container -90deg.
                                Then Pointer is at 0 deg relative to screen (Right), but visually top?
                                No.
                                Let's stick to standard math: 0 is Right (3 oclock).
                                Pointer is at Top (270 deg / -90 deg).
                            */}
                            {items.length > 0 ? items.map((item, index) => {
                                const startPercent = index / items.length;
                                const endPercent = (index + 1) / items.length;
                                const [startX, startY] = getCoordinatesForPercent(startPercent);
                                const [endX, endY] = getCoordinatesForPercent(endPercent);
                                const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
                                const color = colors[index % colors.length];

                                // Path command
                                const pathData = [
                                    `M 0 0`,
                                    `L ${startX} ${startY}`,
                                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                                    `Z`
                                ].join(' ');

                                // Text position (mid-angle)
                                // We need to place text at radius 0.6 or so in the middle of angle
                                const midPercent = (startPercent + endPercent) / 2;
                                const midAngleRad = 2 * Math.PI * midPercent;
                                const textX = 0.65 * Math.cos(midAngleRad);
                                const textY = 0.65 * Math.sin(midAngleRad);
                                const rotationAngle = midPercent * 360; // Rotation for text to be readable? Vertical?

                                return (
                                    <g key={index}>
                                        <path d={pathData} fill={color} stroke="#1f2937" strokeWidth="0.01" />
                                        <text
                                            x={textX}
                                            y={textY}
                                            fill="white"
                                            fontSize="0.1"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            transform={`rotate(${rotationAngle}, ${textX}, ${textY})`}
                                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                                        >
                                            {item.length > 10 ? item.substring(0, 8) + '...' : item}
                                        </text>
                                    </g>
                                );
                            }) : (
                                <circle cx="0" cy="0" r="1" fill="#374151" />
                            )}
                        </svg>
                    </div>
                </div>

                {/* Controls under roulette (Mobile mainly, or main button) */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={spin}
                        disabled={isSpinning || items.length === 0}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xl font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] transform active:scale-95 transition-all"
                    >
                        {isSpinning ? 'Spinning...' : 'SPIN!'}
                    </button>

                    {winner && (
                        <div className="mt-4 p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-center animate-bounce">
                            <div className="text-sm text-gray-400 uppercase tracking-widest">Winner</div>
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                                {winner}
                            </div>
                        </div>
                    )}
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

            {/* Right: Settings */}
            <div className="w-full md:w-96 bg-gray-900 border-l border-gray-800 p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-cyan-400">Items Setup</h2>
                <p className="text-gray-400 text-sm mb-4">Enter each item on a new line.</p>

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 w-full bg-gray-950 border border-gray-700 rounded-lg p-4 text-white font-mono focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                    placeholder="Enter items..."
                    disabled={isSpinning}
                />

                <div className="mt-4 text-sm text-gray-500">
                    Total items: {items.length}
                </div>
            </div>
        </div>
    );
}
