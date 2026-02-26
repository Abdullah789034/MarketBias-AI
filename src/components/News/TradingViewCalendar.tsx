"use client";

import { memo } from 'react';
import { EconomicCalendar } from "react-ts-tradingview-widgets";
import { CalendarDays } from "lucide-react";

const TradingViewCalendar = () => {
    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl h-full flex flex-col group/cal overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-neutral-200 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-indigo-400 group-hover/cal:text-cyan-400 transition-colors" />
                    Economic Calendar
                </h3>
            </div>

            {/* The widget container */}
            <div className="flex-1 min-h-0 relative rounded-xl overflow-hidden mt-1 bg-[#0A0A0A]">
                <EconomicCalendar
                    colorTheme="dark"
                    height="100%"
                    width="100%"
                    isTransparent={true}
                    importanceFilter="0,1" // Show medium & high impact
                />
            </div>
        </div>
    );
};

export default memo(TradingViewCalendar);
