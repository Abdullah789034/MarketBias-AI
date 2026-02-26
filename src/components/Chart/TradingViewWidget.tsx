"use client";

import { memo } from 'react';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

interface TradingViewWidgetProps {
    symbol: string;
}

const TradingViewWidget = ({ symbol }: TradingViewWidgetProps) => {
    return (
        <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden">
            <AdvancedRealTimeChart
                theme="dark"
                symbol={symbol}
                autosize
                allow_symbol_change={true}
                hide_side_toolbar={false}
                backgroundColor="#0A0A0A"
                calendar={true}
                details={true}
                hotlist={true}
                enable_publishing={false}
                withdateranges={true}
            />
        </div>
    );
};

export default memo(TradingViewWidget);
