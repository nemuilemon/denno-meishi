import Link from 'next/link';
import Header from '../components/Header';

const tools = [
    {
        name: 'Clock',
        description: '現在時刻を表示するデジタル時計',
        href: '/tools/clock',
        active: true,
        icon: '⏰',
    },
    {
        name: 'Roulette',
        description: '運命を決めるランダムルーレット',
        href: '#',
        active: false, // まだ実装していないのでfalse
        icon: '🎰',
    },
    {
        name: 'Calculator',
        description: 'シンプルな電卓ツール',
        href: '#',
        active: false,
        icon: '🧮',
    },
];

export default function ToolsIndex() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-gray-950 text-white font-sans">
            <Header />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    Toolbox <span className="text-sm text-gray-500 font-normal ml-2">Experimental Utilities</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <Link
                            key={tool.name}
                            href={tool.active ? tool.href : '#'}
                            className={`block p-6 rounded-xl border transition-all duration-300 ${tool.active
                                ? 'bg-gray-900 border-gray-700 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] cursor-pointer'
                                : 'bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed'
                                }`}
                        >
                            <div className="text-4xl mb-4">{tool.icon}</div>
                            <h2 className="text-xl font-bold mb-2 flex items-center justify-between">
                                {tool.name}
                                {!tool.active && <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Coming Soon</span>}
                            </h2>
                            <p className="text-gray-400 text-sm">{tool.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
