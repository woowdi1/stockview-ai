import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  DollarSign,
  Activity,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { Ticker } from "@/data/tickers";
import { generatePriceHistory } from "@/data/priceHistory";
import ScoreBadge from "./ScoreBadge";
import MetricBar from "./MetricBar";
import { useState } from "react";

interface TickerDetailProps {
  ticker: Ticker;
  onBack: () => void;
}

const PERIODS = ["1Н", "1М", "3М", "6М", "1Г"] as const;

const metricInfo = [
  { key: "profitability" as const, label: "Profitability", icon: DollarSign, desc: "Маржинальность и рентабельность" },
  { key: "growth" as const, label: "Growth", icon: TrendingUp, desc: "Темпы роста выручки и прибыли" },
  { key: "value" as const, label: "Value", icon: BarChart3, desc: "Оценка стоимости по мультипликаторам" },
  { key: "momentum" as const, label: "Momentum", icon: Activity, desc: "Ценовой импульс и тренд" },
  { key: "stability" as const, label: "Stability", icon: Shield, desc: "Финансовая устойчивость" },
];

const TickerDetail = ({ ticker, onBack }: TickerDetailProps) => {
  const [period, setPeriod] = useState("1М");
  const isPositive = ticker.change >= 0;
  const priceData = generatePriceHistory(ticker, 30);
  const chartColor = isPositive ? "hsl(160, 84%, 44%)" : "hsl(0, 72%, 55%)";

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col overflow-y-auto pb-8"
    >
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-1 px-4 pt-3 pb-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Назад</span>
      </motion.button>

      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <ScoreBadge score={ticker.score} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-lg text-foreground">{ticker.symbol}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{ticker.sector}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{ticker.name}</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-warning transition-colors">
            <Star className="w-4 h-4" />
          </button>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="font-mono font-bold text-2xl text-foreground">${ticker.price.toLocaleString()}</span>
          <div className={`flex items-center gap-1 mt-1 ${isPositive ? "text-gain" : "text-loss"}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span className="font-mono text-sm font-semibold">
              {isPositive ? "+" : ""}{ticker.change.toFixed(2)} ({isPositive ? "+" : ""}{ticker.changePercent.toFixed(2)}%)
            </span>
            <span className="text-[10px] text-muted-foreground ml-1">сегодня</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4">
        <div className="glass rounded-xl p-3">
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis domain={["dataMin", "dataMax"]} hide />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))", fontSize: "10px" }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Цена"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={chartColor}
                  strokeWidth={2}
                  fill="url(#chartGradient)"
                  dot={false}
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Period selector */}
          <div className="flex gap-1 mt-2">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-medium transition-colors ${
                  period === p
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key stats */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Капитализация", value: ticker.marketCap },
            { label: "P/E", value: ticker.pe ? ticker.pe.toFixed(1) : "—" },
            { label: "Объём", value: ticker.volume },
          ].map(({ label, value }) => (
            <div key={label} className="glass rounded-xl p-2.5 text-center">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
              <p className="font-mono font-bold text-xs text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="px-4 mt-4">
        <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Zap className="w-3 h-3" />
          Детальные метрики
        </h3>
        <div className="glass rounded-xl p-3.5 space-y-3">
          {metricInfo.map(({ key, label, icon: Icon, desc }) => (
            <div key={key}>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="w-3 h-3 text-primary" />
                <span className="text-[11px] font-semibold text-foreground">{label}</span>
                <span className="text-[9px] text-muted-foreground ml-auto">{desc}</span>
              </div>
              <MetricBar label="" value={ticker.metrics[key]} />
            </div>
          ))}
        </div>
      </div>

      {/* Score breakdown */}
      <div className="px-4 mt-4">
        <div className="glass rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Итоговый Score</span>
            <ScoreBadge score={ticker.score} size="sm" />
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ticker.score}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-loss via-warning to-gain"
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] font-mono text-muted-foreground">0</span>
            <span className="text-[9px] font-mono text-muted-foreground">100</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TickerDetail;
