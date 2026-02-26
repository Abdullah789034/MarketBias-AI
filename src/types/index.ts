export type Timeframe = 'Intraday' | 'Swing' | 'Investment';

export interface Candle {
  time: number; // Unix timestamp
  open: number;
  high: number;
  low: number;
  close: number;
}

export type Sentiment = 'Bullish' | 'Bearish' | 'Neutral';
export type Impact = 'High' | 'Medium' | 'Low';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: number; // Unix timestamp
  sentiment: Sentiment;
  impact: Impact;
  relatedSymbol: string;
}
