export interface Ticker {
  symbol: string;
  name: string;
  score: number;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  pe: number | null;
  volume: string;
  sector: string;
  metrics: {
    profitability: number;
    growth: number;
    value: number;
    momentum: number;
    stability: number;
  };
}

export const mockTickers: Ticker[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    score: 94,
    price: 878.36,
    change: 18.42,
    changePercent: 2.14,
    marketCap: "2.16T",
    pe: 72.3,
    volume: "42.1M",
    sector: "Technology",
    metrics: { profitability: 96, growth: 98, value: 45, momentum: 92, stability: 78 },
  },
  {
    symbol: "AAPL",
    name: "Apple Inc",
    score: 88,
    price: 213.07,
    change: 3.21,
    changePercent: 1.53,
    marketCap: "3.28T",
    pe: 33.1,
    volume: "58.3M",
    sector: "Technology",
    metrics: { profitability: 92, growth: 65, value: 72, momentum: 85, stability: 95 },
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    score: 91,
    price: 442.58,
    change: -2.15,
    changePercent: -0.48,
    marketCap: "3.29T",
    pe: 37.8,
    volume: "21.7M",
    sector: "Technology",
    metrics: { profitability: 94, growth: 78, value: 68, momentum: 80, stability: 92 },
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    score: 85,
    price: 514.23,
    change: 8.67,
    changePercent: 1.71,
    marketCap: "1.30T",
    pe: 28.4,
    volume: "18.9M",
    sector: "Technology",
    metrics: { profitability: 88, growth: 82, value: 76, momentum: 88, stability: 70 },
  },
  {
    symbol: "LLY",
    name: "Eli Lilly",
    score: 82,
    price: 792.45,
    change: -5.32,
    changePercent: -0.67,
    marketCap: "753B",
    pe: 118.2,
    volume: "3.8M",
    sector: "Healthcare",
    metrics: { profitability: 75, growth: 95, value: 32, momentum: 78, stability: 85 },
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    score: 79,
    price: 186.49,
    change: 1.88,
    changePercent: 1.02,
    marketCap: "1.94T",
    pe: 58.7,
    volume: "47.2M",
    sector: "Consumer",
    metrics: { profitability: 68, growth: 85, value: 55, momentum: 82, stability: 80 },
  },
  {
    symbol: "AVGO",
    name: "Broadcom",
    score: 87,
    price: 1342.67,
    change: 22.45,
    changePercent: 1.70,
    marketCap: "625B",
    pe: 62.1,
    volume: "5.1M",
    sector: "Technology",
    metrics: { profitability: 90, growth: 88, value: 58, momentum: 90, stability: 82 },
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    score: 76,
    price: 198.34,
    change: -1.23,
    changePercent: -0.62,
    marketCap: "571B",
    pe: 11.8,
    volume: "9.4M",
    sector: "Finance",
    metrics: { profitability: 82, growth: 55, value: 88, momentum: 72, stability: 75 },
  },
];
