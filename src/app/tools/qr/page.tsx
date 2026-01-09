'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import { FaDownload, FaLink, FaQrcode } from 'react-icons/fa';

export default function QrPage() {
    const [text, setText] = useState('https://nemuilemon.top');
    const [size, setSize] = useState(256);
    const canvasRef = useRef<HTMLDivElement>(null);

    const downloadQr = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current.querySelector('canvas');
        if (!canvas) return;

        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `qrcode-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 text-white font-sans overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] absolute -top-40 -left-40"></div>
                <div className="w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] absolute -bottom-40 -right-40"></div>
            </div>

            {/* Left/Top: Input Area */}
            <div className="flex-1 flex flex-col justify-center p-8 z-10">
                <div className="max-w-xl mx-auto w-full space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                            <span className="text-blue-400"><FaQrcode /></span>
                            QR Generator
                        </h1>
                        <p className="text-gray-400">Generate high-quality QR codes instantly.</p>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">Content</label>
                        <div className="relative">
                            <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500">
                                <FaLink />
                            </div>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-gray-900/80 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                                placeholder="Enter URL or text..."
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">Size (px): {size}</label>
                        <input
                            type="range"
                            min="128"
                            max="512"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Right/Bottom: Preview Area */}
            <div className="flex-1 bg-gray-900/50 backdrop-blur-sm border-t md:border-t-0 md:border-l border-gray-800 flex flex-col items-center justify-center p-8 z-10">
                <div className="bg-white p-6 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.2)] transform transition-transform hover:scale-105 duration-300" ref={canvasRef}>
                    {text ? (
                        <QRCodeCanvas
                            value={text}
                            size={size}
                            level={"H"}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            includeMargin={false}
                        />
                    ) : (
                        <div className="w-[256px] h-[256px] bg-gray-100 flex items-center justify-center text-gray-400 rounded">
                            No Content
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <button
                        onClick={downloadQr}
                        disabled={!text}
                        className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaDownload /> Download PNG
                    </button>
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
        </div>
    );
}
