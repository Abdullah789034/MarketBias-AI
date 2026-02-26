"use client";

import { memo, useMemo } from 'react';
import { Clock, ExternalLink } from "lucide-react";

interface MarketIntelligenceProps {
    symbol: string;
}

const generateNews = (symbol: string) => {
    const baseNews = [
        { id: 1, title: `Institutions aggressively accumulating ${symbol} in dark pools according to latest on-chain metrics.`, type: 'Bullish', time: '10m ago' },
        { id: 2, title: `Global regulatory updates could create temporary headwind for ${symbol} liquidity.`, type: 'Bearish', time: '1h ago' },
        { id: 3, title: `Retail sentiment drops to monthly lows, often a contrarian signal for ${symbol}.`, type: 'Neutral', time: '3h ago' },
        { id: 4, title: `Options market implies massive volatility expansion for ${symbol} by Friday's close.`, type: 'Neutral', time: '5h ago' }
    ];
    // Shuffle or modify based on symbol logically if wanted, return static for now as mock
    return baseNews;
};

const MarketIntelligence = ({ symbol }: MarketIntelligenceProps) => {
    const news = useMemo(() => generateNews(symbol), [symbol]);

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-neutral-200">Market Intelligence</h3>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
                {news.map(item => (
                    <div key={item.id} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition group cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="flex items-center gap-1 text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                                <Clock className="w-3 h-3" /> {item.time}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.type === 'Bullish' ? 'bg-emerald-500/20 text-emerald-400' :
                                    item.type === 'Bearish' ? 'bg-red-500/20 text-red-400' :
                                        'bg-amber-500/20 text-amber-400'
                                }`}>
                                {item.type}
                            </span>
                        </div>
                        <p className="text-sm text-neutral-300 leading-snug group-hover:text-white transition-colors">
                            {item.title}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read Full Report <ExternalLink className="w-3 h-3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(MarketIntelligence);
