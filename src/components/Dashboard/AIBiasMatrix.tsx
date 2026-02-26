"use client";

import { memo, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import clsx from 'clsx';

interface AIBiasMatrixProps {
    symbol: string;
}

const generateBiasData = (symbol: string) => {
    // Deterministic mock generation based on symbol
    const sum = symbol.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const getDir = (val: number) => val % 3 === 0 ? 'Bullish' : val % 3 === 1 ? 'Bearish' : 'Neutral';
    const getScore = (val: number) => (val % 40) + 60; // 60-100 score

    return {
        daily: { dir: getDir(sum), score: getScore(sum) },
        weekly: { dir: getDir(sum + 1), score: getScore(sum + 1) },
        monthly: { dir: getDir(sum + 2), score: getScore(sum + 2) },
        overall: getDir(sum + 3)
    };
};

const BiasRow = ({ label, data }: { label: string, data: { dir: string, score: number } }) => {
    const isBull = data.dir === 'Bullish';
    const isBear = data.dir === 'Bearish';

    return (
        <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors cursor-default group">
            <span className="text-sm font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors">{label}</span>
            <div className="flex items-center gap-3">
                <div className={clsx(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                    isBull ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                        isBear ? "bg-red-500/10 border-red-500/30 text-red-400" :
                            "bg-amber-500/10 border-amber-500/30 text-amber-400"
                )}>
                    {isBull ? <TrendingUp className="w-3 h-3" /> : isBear ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    {data.dir}
                </div>
                <span className="text-sm font-mono text-neutral-500 w-8 text-right">{data.score}%</span>
            </div>
        </div>
    );
};

const AIBiasMatrix = ({ symbol }: AIBiasMatrixProps) => {
    const data = useMemo(() => generateBiasData(symbol), [symbol]);

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-neutral-200">AI Bias Matrix</h3>
                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-neutral-400 uppercase tracking-wider">
                    {symbol}
                </div>
            </div>

            <div className="flex flex-col gap-1 flex-1">
                <BiasRow label="Daily (1D)" data={data.daily} />
                <BiasRow label="Weekly (1W)" data={data.weekly} />
                <BiasRow label="Monthly (1M)" data={data.monthly} />
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Net Sentiment</span>
                <span className={clsx(
                    "text-lg font-black tracking-tight",
                    data.overall === 'Bullish' ? "text-emerald-400" :
                        data.overall === 'Bearish' ? "text-red-400" :
                            "text-amber-400"
                )}>
                    {data.overall.toUpperCase()}
                </span>
            </div>
        </div>
    );
};

export default memo(AIBiasMatrix);
