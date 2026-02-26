"use client";

import { useState } from "react";
import TradingViewWidget from "@/components/Chart/TradingViewWidget";
import AIBiasMatrix from "@/components/Dashboard/AIBiasMatrix";
import TradingViewCalendar from "@/components/News/TradingViewCalendar";
import AICopilot from "@/components/Assistant/AICopilot";
import { Search, TrendingUp, Activity } from "lucide-react";

export default function Dashboard() {
  const [symbol, setSymbol] = useState("BINANCE:BTCUSD");

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Premium Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">TradeBias AI</span>
              <div className="text-[10px] font-medium text-cyan-400 uppercase tracking-widest">Pro Terminal</div>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-12 relative flex flex-col gap-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="relative w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white placeholder-neutral-500 shadow-inner"
                placeholder="Search Symbol (e.g. BINANCE:BTCUSD)"
              />
              <Search className="absolute left-4 top-3 text-neutral-400 w-5 h-5 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <span className="text-xs font-semibold text-neutral-500 py-1 hidden sm:block">Trending:</span>
              {[
                { label: 'EUR/USD', sym: 'FX:EURUSD', color: 'text-emerald-400' },
                { label: 'GBP/USD', sym: 'FX:GBPUSD', color: 'text-emerald-400' },
                { label: 'USD/JPY', sym: 'FX:USDJPY', color: 'text-emerald-400' },
                { label: 'DXY', sym: 'TVC:DXY', color: 'text-indigo-400' },
                { label: 'BTC/USD', sym: 'BINANCE:BTCUSD', color: 'text-amber-400' },
                { label: 'ETH/USD', sym: 'BINANCE:ETHUSD', color: 'text-amber-400' },
                { label: 'SOL/USD', sym: 'BINANCE:SOLUSD', color: 'text-amber-400' },
              ].map(item => (
                <button
                  key={item.sym}
                  onClick={() => setSymbol(item.sym)}
                  className="text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/10 px-3 py-1 rounded-full transition-all flex items-center gap-1.5 border border-white/5 bg-black/50"
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-current ${item.color}`}></span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm font-mono w-32 justify-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Link
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-80px)]">

        {/* Left Column: Chart & AI Copilot */}
        <div className="xl:col-span-8 flex flex-col gap-8 h-full">
          {/* Main Chart (Increased Height) */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-1.5 shadow-2xl h-[550px] shrink-0 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <TradingViewWidget symbol={symbol} />
          </div>

          {/* Bottom Panel: AI Copilot (Primary Focus) */}
          <div className="flex-1 min-h-[350px]">
            <AICopilot symbol={symbol} />
          </div>
        </div>

        {/* Right Column: AI Intelligence & Bias */}
        <div className="xl:col-span-4 h-full flex flex-col gap-8">
          {/* Custom Bias Matrix */}
          <div className="shrink-0 h-[350px]">
            <AIBiasMatrix symbol={symbol} />
          </div>

          {/* Economic Calendar (ForexFactory style replacement) */}
          <div className="flex-1 min-h-[400px]">
            <TradingViewCalendar />
          </div>
        </div>

      </main>
    </div>
  );
}
