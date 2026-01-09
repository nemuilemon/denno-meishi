'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaBackspace, FaDivide, FaTimes, FaMinus, FaPlus, FaEquals, FaTrash } from 'react-icons/fa';

type Operator = '/' | '*' | '-' | '+' | null;

export default function CalculatorPage() {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<Operator>(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);
    const [history, setHistory] = useState<string>('');

    const handleNumberConfig = useCallback((numStr: string) => {
        if (waitingForNewValue) {
            setDisplay(numStr);
            setWaitingForNewValue(false);
        } else {
            setDisplay(prev => (prev === '0' ? numStr : prev + numStr));
        }
    }, [waitingForNewValue]);

    const handleDecimal = useCallback(() => {
        if (waitingForNewValue) {
            setDisplay('0.');
            setWaitingForNewValue(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(prev => prev + '.');
        }
    }, [waitingForNewValue, display]);

    const handleClear = useCallback(() => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setWaitingForNewValue(false);
        setHistory('');
    }, []);

    const handleDelete = useCallback(() => {
        if (waitingForNewValue) return;
        setDisplay(prev => {
            if (prev.length === 1) return '0';
            return prev.slice(0, -1);
        });
    }, [waitingForNewValue]);

    const calculate = useCallback((a: string, b: string, op: Operator): string => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (isNaN(numA) || isNaN(numB)) return '0';

        switch (op) {
            case '+': return (numA + numB).toString();
            case '-': return (numA - numB).toString();
            case '*': return (numA * numB).toString();
            case '/': return numB === 0 ? 'Error' : (numA / numB).toString();
            default: return b;
        }
    }, []);

    const handleOperator = useCallback((nextOperator: Operator) => {
        if (operator && !waitingForNewValue && prevValue) {
            const result = calculate(prevValue, display, operator);
            setDisplay(result);
            setPrevValue(result);
            setHistory(`${result} ${nextOperator}`);
        } else {
            setPrevValue(display);
            setHistory(`${display} ${nextOperator}`);
        }

        setOperator(nextOperator);
        setWaitingForNewValue(true);
    }, [operator, waitingForNewValue, prevValue, display, calculate]);

    const handleEqual = useCallback(() => {
        if (!operator || !prevValue) return;

        const result = calculate(prevValue, display, operator);
        setHistory('');
        setDisplay(result);
        setPrevValue(null);
        setOperator(null);
        setWaitingForNewValue(true);
    }, [operator, prevValue, display, calculate]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (/\d/.test(e.key)) handleNumberConfig(e.key);
            if (e.key === '.') handleDecimal();
            if (e.key === 'Backspace') handleDelete();
            if (e.key === 'Escape') handleClear();
            if (e.key === '+') handleOperator('+');
            if (e.key === '-') handleOperator('-');
            if (e.key === '*') handleOperator('*');
            if (e.key === '/') handleOperator('/');
            if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                handleEqual();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNumberConfig, handleDecimal, handleDelete, handleClear, handleOperator, handleEqual]);

    const Button = ({
        children,
        onClick,
        variant = 'default',
        className = ''
    }: {
        children: React.ReactNode;
        onClick: () => void;
        variant?: 'default' | 'operator' | 'action' | 'equal';
        className?: string;
    }) => {
        const baseStyles = "h-16 md:h-20 text-xl md:text-2xl font-bold rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center shadow-lg";
        const variants = {
            default: "bg-gray-800 text-white hover:bg-gray-700 shadow-black/40",
            operator: "bg-gray-900 text-cyan-400 border border-gray-800 hover:bg-gray-800 hover:border-cyan-500/50 shadow-black/40",
            action: "bg-gray-900 text-red-400 border border-gray-800 hover:bg-gray-800 hover:border-red-500/50 shadow-black/40",
            equal: "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-cyan-900/40"
        };

        return (
            <button
                onClick={onClick}
                className={`${baseStyles} ${variants[variant]} ${className}`}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4 font-mono relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-[800px] h-[800px] bg-blue-600 rounded-full blur-[100px] absolute -top-96 -right-96"></div>
                <div className="w-[600px] h-[600px] bg-cyan-600 rounded-full blur-[100px] absolute -bottom-64 -left-64"></div>
            </div>

            <div className="z-10 w-full max-w-sm md:max-w-md">
                {/* Display */}
                <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 mb-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50"></div>

                    {/* History */}
                    <div className="h-6 text-right text-sm text-gray-500 font-light tracking-wider mb-1">
                        {history || '\u00A0'}
                    </div>

                    {/* Main Display */}
                    <div className="text-right text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 break-all">
                        {display}
                    </div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-3 md:gap-4 p-4 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl">
                    <Button onClick={handleClear} variant="action"><FaTrash size={16} /></Button>
                    <Button onClick={handleDelete} variant="action"><FaBackspace /></Button>
                    <Button onClick={() => handleOperator('/')} variant="operator"><FaDivide /></Button>
                    <Button onClick={() => handleOperator('*')} variant="operator"><FaTimes /></Button>

                    <Button onClick={() => handleNumberConfig('7')}>7</Button>
                    <Button onClick={() => handleNumberConfig('8')}>8</Button>
                    <Button onClick={() => handleNumberConfig('9')}>9</Button>
                    <Button onClick={() => handleOperator('-')} variant="operator"><FaMinus /></Button>

                    <Button onClick={() => handleNumberConfig('4')}>4</Button>
                    <Button onClick={() => handleNumberConfig('5')}>5</Button>
                    <Button onClick={() => handleNumberConfig('6')}>6</Button>
                    <Button onClick={() => handleOperator('+')} variant="operator"><FaPlus /></Button>

                    <Button onClick={() => handleNumberConfig('1')}>1</Button>
                    <Button onClick={() => handleNumberConfig('2')}>2</Button>
                    <Button onClick={() => handleNumberConfig('3')}>3</Button>
                    <Button onClick={handleEqual} variant="equal" className="row-span-2 h-full"><FaEquals /></Button>

                    <Button onClick={() => handleNumberConfig('0')} className="col-span-2 w-full">0</Button>
                    <Button onClick={handleDecimal}>.</Button>
                </div>

                <div className="mt-12 z-10 text-center">
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
